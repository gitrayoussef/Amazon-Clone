<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Item;
use Illuminate\Http\Request;

class OrderItemsController extends Controller
{
    public function index()
    {
        
        try {

  /*           $allOrder=Item::select(
                'cart_items.session_id',
                'cart_items.quantity',
                'cart_items.product_id'
            )
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->join('cart_items', 'products.id', '=', 'cart_items.product_id')
            ->get(); */

                $allOrder=Item::all();        
            if ($allOrder != null) {
                return response()->json([
                    'status' => 'true',
                    'data' => $allOrder,
                ], 201);
            } else {
                return response()->json([
                    'status' => 'true',
                    'msg' => 'there is no order now '
                ],201);
            }
        } catch (Exception $ex) {
            return response()->json(['status' => 'error', 'expcetion' => $ex->getMessage(), 'msg' => 'failed to get orders'], 500);
        }

    }

    public function store(Request $request)
    {
        $order = new Item();
        $order->order_id = $request->order_id;
        $order->product_id = $request->product_id;
        $order->quantity = $request->quantity;
        $order->save();
        return response()->json([
            'status' => 'true',
            'msg' => 'data stored successfuly'
        ], 201);
    }

    public function show($id)
    {
        try {
            $order=Item::select(
                'cart_items.session_id',
                'cart_items.quantity',
                'cart_items.product_id',
                
            )
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->join('cart_items', 'products.id', '=', 'cart_items.product_id')
            ->where('order_items.id','=',$id)
            ->get();
            //$order = Item::find($id);
            if ($order != null) {
                return response()->json([
                    'status' => 'true',
                    'data' => $order,
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
            $order = Item::find($id);
            if ($order != null) {
                $order->order_id = $request->order_id;
                $order->product_id = $request->product_id;
                $order->quantity = $request->quantity;
                $order->save();
                return response()->json([
                    'status' => 'true',
                    'msg' => 'your order is updated now'
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

            $order = Item::find($id);
            if ($order != null) {
                $order->delete();
                return response()->json([
                    'status' => 'true',
                    'msg' => 'your order is deleted now'
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
