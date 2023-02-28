<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\CartResource;
use App\Http\Resources\ProductsResource;
use App\Models\Product;
use App\Models\Session;

class CartController extends Controller 
{

    public function index()
    {
        
        try {
           
            $AllCarts = Cart::select(
                "cart_items.id",	
                "cart_items.session_id",
                "cart_items.product_id",	
                "cart_items.quantity",
                "products.name",
                "products.price",
                "products.image",
                "products.imagepath"
            )
            ->join("products", "products.id", "=", "cart_items.product_id")
            ->get();
            
               
            if ($AllCarts != null) {
                return response()->json([
                    'status' => 'true',
                    'data' => $AllCarts,
                ], 201);
            } else {
                return response()->json([
                    'status' => 'true',
                    'msg' => 'there is no reviews now '
                ],201);
            }
        } catch (Exception $ex) {
            return response()->json(['status' => 'error', 'expcetion' => $ex->getMessage(), 'msg' => 'failed to get allCarts'], 500);
        }

    }

    public function store(Request $request)
    {
        $cartItem = Cart::where('session_id',$request->session_id )->where('product_id', $request->product_id)->first();
        if ($cartItem) {  
            $cartItem->quantity += $request->quantity;  
            $cartItem->save();  
        }
        else{
            $cart = new Cart();
            $cart->session_id = $request->session_id;
            $cart->product_id = $request->product_id;
            $cart->quantity = $request->quantity;
            $cart->save();
        }
        return response()->json([
            'status' => 'true',
            'msg' => 'data stored successfuly'
        ], 201);
    }

    public function show($id)
    {
        try {
            $cart = Cart::find($id);
            if ($cart != null) {
                return response()->json([
                    'status' => 'true',
                    'user' => $cart,
                ], 201);
            } else {
                return response()->json([
                    'status' => 'true',
                    'msg' => 'no records with this id ,please check id ! '
                ],201);
            }
        } catch (Exception $ex) {
            return response()->json(['status' => 'error', 'expcetion' => $ex->getMessage(), 'msg' => 'view process failed'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $cart = Cart::find($id);
            if ($cart != null) {
                $cart->session_id = $request->session_id;
                $cart->product_id = $request->product_id;
                $cart->quantity = $request->quantity;
                $cart->save();
                return response()->json([
                    'status' => 'true',
                    'msg' => 'your cart is updated now'
                ],201);
            } else {
                return response()->json([
                    'status' => 'true',
                    'msg' => 'no records with this id ,please check id ! '
                ],201);
            }
        } catch (Exception $ex) {
            return response()->json(['status' => 'error', 'expcetion' => $ex->getMessage(), 'msg' => 'update process failed'], 500);
        }
    }

    public function destroy($id)
    {
        try {

            $cart = Cart::find($id);
            if ($cart != null) {
                $cart->delete();
                return response()->json([
                    'status' => 'true',
                    'msg' => 'your cart is deleted now'
                ],201);
            } else {
                return response()->json([
                    'status' => 'true',
                    'msg' => 'no records with this id ,please check id ! '
                ],201);
            }
        } catch (Exception $ex) {
            return response()->json(['status' => 'error', 'expcetion' => $ex->getMessage(), 'msg' => 'delete process failed'], 500);
        }
    }

}