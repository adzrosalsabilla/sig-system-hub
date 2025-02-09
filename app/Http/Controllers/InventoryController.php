<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $inventories = Inventory::paginate(10);

        return Inertia::render('Admin/inventories/Inventory', [
            'inventories' => $inventories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/inventories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'min:3', 'max:30'],
            'item_code' => ['required', 'string', 'min:3', 'max:30'],
            'stock' => ['required', 'numeric', 'min:1'],
            'price' => ['required', 'numeric', 'min:1'],
            'purchase_date' => ['required', 'date'],
        ]);

        Inventory::create([
            'name' => $request->name,
            'item_code' => $request->item_code,
            'stock' => $request->stock,
            'price' => $request->price,
            'purchase_date' => $request->purchase_date,
        ]);

        return redirect()->route('admin.inventory')
            ->with('success', 'New inventory has been added.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Inventory $inventory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Inventory $inventory)
    {
        return Inertia::render('Admin/inventories/Edit', [
            'inventory' => $inventory
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Inventory $inventory)
    {
        $request->validate([
            'name' => ['required', 'string', 'min:3', 'max:30'],
            'item_code' => ['required', 'string', 'min:3', 'max:30'],
            'stock' => ['required', 'numeric', 'min:1'],
            'price' => ['required', 'numeric', 'min:1'],
            'purchase_date' => ['required', 'date'],
        ]);

        $inventory->update([
            'name' => $request->name,
            'item_code' => $request->item_code,
            'stock' => $request->stock,
            'price' => $request->price,
            'purchase_date' => $request->purchase_date,
        ]);

        return redirect()->route('admin.inventory')
            ->with('success', 'Inventory has been updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inventory $inventory)
    {
        $inventory->delete();
        return redirect()->route('admin.inventory')
            ->with('success', 'Inventory has been deleted.');
    }
}
