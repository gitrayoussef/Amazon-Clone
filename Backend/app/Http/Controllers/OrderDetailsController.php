<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderDetailsController extends Controller
{
    public function index()
    {
        
        try {
                $allOrder=Order::all();        
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
        $order = new Order();
        $order->user_id = $request->user_id;
        $order->payment_id = $request->payment_id;
        $order->total = $request->total;
        $order->save();
        return response()->json([
            'status' => 'true',
            'order_id' => $order->id
        ], 201);
    }

    public function show($id)
    {
        try {
            $order = Order::find($id);
            if ($order != null) {
                return response()->json([
                    'status' => 'true',
                    'user' => $order,
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
            $order = Order::find($id);
            if ($order != null) {
                $order->user_id = $request->user_id;
                $order->total = $request->total;
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

            $order = Order::find($id);
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
