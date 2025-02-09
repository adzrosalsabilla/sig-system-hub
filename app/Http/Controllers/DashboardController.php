<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function admin()
    {
        $year = $request->year ?? date('Y');
        // Get all transactions in the selected year
        $transactions = Transaction::whereYear('created_at', $year)->get();

        // Calculate monthly sales (grouped by month)
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $monthlySales = [];
        foreach ($months as $month) {
            $sales = $transactions->filter(function ($transaction) use ($month) {
                return $transaction->created_at->format('M') == $month;
            })->sum('amount');
            $monthlySales[] = [
                'name' => $month,
                'sales' => $sales ? $sales : 0,
            ];
        }

        // Get the total sales for the selected year
        $totalSales = $transactions->sum('amount');


        // Get the recent sales (limit to the last 4 transactions)
        $recentSales = $transactions->take(4)->map(function ($transaction) {
            return [
                'id' => $transaction->id,
                'date' => $transaction->created_at->format('Y-m-d'),
                'product' => $transaction->transaction_number, // Or fetch related product info if applicable
                'user' => $transaction->user->name,
                'amount' => $transaction->amount,
            ];
        })->toArray();


        $products = Product::latest();
        $products = $products->paginate(10);

        $draftProducts = Product::where('status', 'draft')->paginate(10);
        $activeProducts = Product::where('status', 'active')->paginate(10);
        $archivedProducts = Product::where('status', 'archived')->paginate(10);

        return Inertia::render('Dashboard', [
            'year' => $year,
            'salesData' => [
                'monthlySales' => $monthlySales,
                'recentSales' => $recentSales,
                'totalSales' => $totalSales
            ],
            'products' => $products,
            'draftProducts' => $draftProducts,
            'activeProducts' => $activeProducts,
            'archivedProducts' => $archivedProducts,
        ]);
    }
}
