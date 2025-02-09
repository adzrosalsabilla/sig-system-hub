<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'min:3', 'max:100']
        ]);

        ProductCategory::create($request->all());
        return redirect()->back()->with('status', 'New catetegory has been added to the categories.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductCategory $productCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductCategory $productCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProductCategory $productCategory)
    {
        $request->validate([
            'editedName' => ['required', 'string', 'min:3', 'max:100']
        ]);

        $productCategory->update(['name' => $request->editedName]);
        return redirect()->back()->with('status', 'Category has been updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductCategory $productCategory)
    {
        $productCategory->delete();
        return redirect()->back()->with('status', 'Category has been deleted.');
    }
}
