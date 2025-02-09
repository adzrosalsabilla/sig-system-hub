<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class ReportController extends Controller
{
    public function index(Request $request)
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

        // Get top-selling products from pivot table (cart_product)
        $topSellingProducts = Product::with('carts')
            ->select('products.*', DB::raw('SUM(cart_product.quantity) as total_quantity'))
            ->join('cart_product', 'products.id', '=', 'cart_product.product_id')
            ->groupBy('products.id')
            ->orderBy('total_quantity', 'desc')
            ->take(5)
            ->get();

        // Get a list of unique year from the existing Transaction
        $listYears = Transaction::select(DB::raw('strftime("%Y", created_at) as year'))
            ->distinct()
            ->pluck('year')
            ->toArray();

        if (count($listYears) == 0) {
            $listYears = [date('Y')];
        }

        return Inertia::render('Admin/Report', [
            'year' => $year,
            'listYears' => $listYears,
            'salesData' => [
                'monthlySales' => $monthlySales,
                'recentSales' => $recentSales,
                'totalSales' => $totalSales
            ],
            'topSellingProducts' => $topSellingProducts, // Add this if you want to display top-selling products
        ]);
    }

    public function downloadPdfReport(Request $request)
    {
        $year = $request->year ?? date('Y');

        // Get data for the report
        $transactions = Transaction::whereYear('created_at', $year)->get();

        $monthlySales = $transactions->groupBy(function ($transaction) {
            return $transaction->created_at->format('M');
        })->map(function ($transactions, $month) {
            return [
                'name' => $month,
                'sales' => $transactions->sum('amount'),
            ];
        })->values()->toArray();

        $recentSales = $transactions->take(4)->map(function ($transaction) {
            return [
                'id' => $transaction->id,
                'date' => $transaction->created_at->format('Y-m-d'),
                'product' => $transaction->transaction_number,
                'amount' => $transaction->amount,
            ];
        })->toArray();

        // Load data into view
        $pdf = Pdf::loadView('sales_report', [
            'year' => $year,
            'monthlySales' => $monthlySales,
            'recentSales' => $recentSales
        ]);

        // Download the PDF
        return $pdf->download('sales_report_' . $year . '.pdf');
    }
}
