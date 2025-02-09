<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Retrieve or create a cart for the user
        $cart = Cart::firstOrCreate(
            ['user_id' => $user->id],
            ['total_price' => 0]
        );

        // Retrieve cart items with quantity and price from pivot table
        $cartItems = $cart->products()->get()->map(function ($product) {
            return [
                'product_id' => $product->id,
                'name' => $product->name,
                'image' => asset('storage/' . $product->image),
                'quantity' => $product->pivot->quantity,
                'price' => $product->pivot->price,
                'subtotal' => $product->pivot->quantity * $product->pivot->price,
            ];
        });

        return Inertia::render('Customer/Cart', [
            'cart' => $cart,
            'items' => $cartItems,
        ]);
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
    public function store(Request $request, Product $product)
    {
        // Get the logged-in user
        $user = Auth::user();

        // Retrieve the product
        $productId = $product->id;

        // Check if the user has an existing cart, create one if not
        $cart = Cart::firstOrCreate(
            ['user_id' => $user->id],
            ['total_price' => 0] // New cart, default price to 0
        );

        // Check if the product already exists in the cart
        $existingProduct = $cart->products()->where('product_id', $productId)->first();

        if ($existingProduct) {
            // If product exists in the cart, increase the quantity
            $newQuantity = $existingProduct->pivot->quantity + 1;
            $cart->products()->updateExistingPivot($productId, ['quantity' => $newQuantity, 'price' => $product->price]);
        } else {
            // If product doesn't exist, attach it with a quantity of 1
            $cart->products()->attach($productId, ['quantity' => 1, 'price' => $product->price]);
        }

        // Update total price
        $totalPrice = $cart->products->sum(function ($prod) {
            return $prod->pivot->quantity * $prod->pivot->price;
        });
        $cart->total_price = $totalPrice;
        $cart->save();

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Cart $cart)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cart $cart)
    {
        //
    }

    public function updateProductQuantity(Request $request, $productId)
    {
        $user = Auth::user();

        // Validate the incoming request
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        // Retrieve the user's cart
        $cart = Cart::where('user_id', $user->id)->first();

        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }

        // Check if the product exists in the cart
        $cartProduct = $cart->products()->where('product_id', $productId)->first();

        if (!$cartProduct) {
            return response()->json(['message' => 'Product not found in the cart'], 404);
        }

        // Update the quantity in the pivot table
        $cart->products()->updateExistingPivot($productId, [
            'quantity' => $validated['quantity']
        ]);

        // Optionally, recalculate the total price of the cart
        $this->recalculateCartTotal($cart);

        return back();
    }

    protected function recalculateCartTotal(Cart $cart)
    {
        // Recalculate total price
        $totalPrice = $cart->products->sum(function ($product) {
            return $product->pivot->quantity * $product->pivot->price;
        });

        // Update cart's total price
        $cart->update(['total_price' => $totalPrice]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cart $cart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function removeProduct($productId)
    {
        $user = Auth::user();

        $cart = Cart::where('user_id', $user->id)->first();

        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }

        if (!$cart->products()->where('product_id', $productId)->exists()) {
            return response()->json(['message' => 'Product not found in the cart'], 404);
        }

        $cart->products()->detach($productId);

        $this->recalculateCartTotal($cart);

        return back();
    }
}
