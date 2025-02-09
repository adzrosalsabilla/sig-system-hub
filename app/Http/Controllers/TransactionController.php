<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\User;
use App\Notifications\GeneralNotification;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Midtrans\Config;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with('user')->latest()->paginate(10);

        return Inertia::render('Admin/Transactions', [
            'transactions' => $transactions,
        ]);
    }

    public function userTransaction()
    {
        $user = Auth::user();
        $transactions = Transaction::where('user_id', $user->id)->latest()->paginate(10);
        return Inertia::render('Customer/Transactions', [
            'transactions' => $transactions,
        ]);
    }

    public function createPayment(Request $request)
    {
        // payment gateway
        Config::$serverKey = config('midtrans.serverKey');
        Config::$isProduction = false;
        Config::$isSanitized = true;
        Config::$is3ds = true;
        $user = Auth::user();
        $items = [];
        foreach ($request->items as $item) {
            $items[] = [
                'id' => $item['product_id'],
                'price' => $item['price'],
                'quantity' => $item['quantity'],
                'name' => $item['name'],
                'brand' => '',
                'category' => '',
                'merchant_name' => '',
                'url' => '',
            ];
        }
        $request->merge(['items' => $items]);
        $transaction = Transaction::create([
            'user_id' => Auth::user()->id,
            'amount' => $request->total_price,
            'status' => 'pending',
            'payment_details' => json_encode($request->all()),
        ]);
        // remove cart items after payment
        foreach ($request->items as $item) {
            $product = Product::find($item['id']);
            $product->decrement('stock', $item['quantity']);
        }
        $productIds = array_column($request->items, 'id');
        $cart = Cart::where('user_id', Auth::user()->id)->first();
        $cart->products()->detach($productIds);

        $orderId = 'TRX-' . base_convert($transaction->id, 10, 36)  . time() . '-' . Str::random(5);
        $params = array(
            'transaction_details' => array(
                'order_id' => $orderId,
                'gross_amount' => $request->total_price,
            ),
            'customer_details' => [
                'first_name' => $user->name,
                'email' => $user->email,
            ],
            'item_details' => $request->items,
            'enable_payments' => ['credit_card', 'cimb_clicks', 'bank_transfer', 'bca_va', 'permata_va', 'bri_epay', 'bni_va', "gopay", "shopeepay", "kredivo", "uob_ezpay", "other_qris"],
        );

        try {
            $responseMidtrans = \Midtrans\Snap::createTransaction($params);
            Transaction::where('id', $transaction->id)->update(['transaction_number' => $params['transaction_details']['order_id'], 'payment_url' => $responseMidtrans->redirect_url]);

            $title = "Transaction Created ";
            $message =  $orderId .  "Your transaction has been created, please make a payment to complete the order.";
            $data = ['feature_link' => '/customer/transactions']; // Optional additional data

            $user = User::find(Auth::user()->id);
            $user->notify(new GeneralNotification($title, $message, $data));

            $paymentUrl = $responseMidtrans->redirect_url;
            return response()->json(['url' => $paymentUrl]);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }


    public function callback(Request $request)
    {
        $transaction = Transaction::where('transaction_number', $request->order_id)->first();

        if ($request->transaction_status == 'settlement') {
            $transaction->update(['status' => 'paid']);
        } else {
            $transaction->update(['status' => 'failed']);
        }
        return Redirect::route('customer.transactions');
    }


    public function updateStatus(Request $request, Transaction $transaction)
    {
        $transaction->update(['status' => $request->status]);
        $user = User::find($transaction->user_id);
        $title = "Transaction Updated to " . ucwords($request->status) . " ";
        $message =  $transaction->transaction_number .  "Your transaction has been updated, please check your order status.";
        $data = ['feature_link' => '/customer/transactions']; // Optional additional data

        $user->notify(new GeneralNotification($title, $message, $data));

        return Redirect::route('admin.transactions');
    }

    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
        return Redirect::route('admin.transactions');
    }
}
