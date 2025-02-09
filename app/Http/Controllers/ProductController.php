<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = ProductCategory::all();
        $products = Product::latest();
        if ($request->search) {
            $products = $products->where('name', 'LIKE', "%{$request->search}%");
        }
        $products = $products->paginate(10);

        $draftProducts = Product::where('status', 'draft')->paginate(10);
        $activeProducts = Product::where('status', 'active')->paginate(10);
        $archivedProducts = Product::where('status', 'archived')->paginate(10);

        return Inertia::render('Admin/Products', [
            'categories' => $categories,
            'products' => $products,
            'draftProducts' => $draftProducts,
            'activeProducts' => $activeProducts,
            'archivedProducts' => $archivedProducts,
        ]);
    }

    public function catalog()
    {
        $categories = ProductCategory::all();
        $products = Product::where('status', 'active')->latest()->paginate(8);
        $products->each(function ($product) {
            $product->image = asset('storage/' . $product->image);
        });

        return Inertia::render('Customer/ProductCatalog', [
            'categories' => $categories,
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = ProductCategory::all();
        return Inertia::render('Admin/products/Create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'min:3', 'max:30'],
        ]);
        if ($request->status !== 'draft') {
            $request->validate([
                'status' => ['required', 'string'],
                'description' => ['required', 'string', 'min:10'],
                'price' => ['required', 'numeric', 'min:1'],
                'product_category_id' => ['required', 'numeric', 'exists:product_categories,id'],
                'file' => ['required', 'image', 'mimes:jpeg,jpg,png', 'max:2048'],
            ]);
        }

        if ($request->hasFile('file')) {
            $imagePath = $request->file('file')->store('products', 'public');

            $request->request->add(['image' => $imagePath]);
        }

        Product::create($request->all());

        return redirect()->route('admin.products')
            ->with('products', 'New product has been added to the products.');
    }



    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = ProductCategory::all();
        $product = $product->load('productCategory');
        if (!empty($product->image)) {
            $product->image = asset('storage/' . $product->image);
        }

        return Inertia::render('Admin/products/Edit', [
            'categories' => $categories,
            'product' => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => ['required', 'string', 'min:3', 'max:30'],
            'status' => ['string'],
            'description' => ['string', 'min:10'],
            'price' => ['numeric', 'min:1'],
            'product_category_id' => ['numeric', 'exists:product_categories,id'],
            'file' => ['nullable', 'image', 'mimes:jpeg,jpg,png', 'max:2048'],
        ]);

        if ($request->hasFile('file')) {
            $imagePath = $request->file('file')->store('products', 'public');

            if (isset($request->product['image']) && file_exists(storage_path('app/public/' . $request->product['image']))) {
                unlink(storage_path('app/public/' . $request->product['image']));
            }

            $request->request->add(['image' => $imagePath]);
        }

        $product->update($request->all());

        return redirect()->route('admin.products')
            ->with('products', 'Product has been updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if (isset($product->image) && file_exists(storage_path('app/public/' . $product->image))) {
            unlink(storage_path('app/public/' . $product->image));
        }

        $product->delete();

        return back();
        // return redirect()->route('admin.products')->with('products', 'Product has been deleted');
    }
}
