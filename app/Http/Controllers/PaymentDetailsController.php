<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentDetailsController extends Controller
{
    public function index()
    {
        
        try {
            $allPayment = Payment::all();
            if ($allPayment != null) {
                return response()->json([
                    'status' => 'true',
                    'data' => $allPayment,
                ], 201);
            } else {
                return response()->json([
                    'status' => 'true',
                    'msg' => 'there is no payement now '
                ],201);
            }
        } catch (Exception $ex) {
            return response()->json(['status' => 'error', 'expcetion' => $ex->getMessage(), 'msg' => 'failed to get reviews'], 500);
        }

    }

    public function store(Request $request)
    {
        $payment = new Payment();
        $payment->user_id = $request->user_id;
        $payment->payment_type = $request->payment_type;
        $payment->provider = $request->provider;
        $payment->account_no = $request->account_no;
        $payment->expiry = $request->expiry;
        $payment->save();
        return response()->json([
            'status' => 'true',
            'msg' => 'data stored successfuly'
        ], 201);
    }

    public function show($id)
    {
        try {
            $payment = Payment::find($id);
            if ($payment != null) {
                return response()->json([
                    'status' => 'true',
                    'user' => $payment,
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
            $payment = Payment::find($id);
            if ($payment != null) {
                $payment->rate = $request->rate;
                $payment->desc = $request->desc;
                $payment->save();
                return response()->json([
                    'status' => 'true',
                    'msg' => 'your payement is updated now'
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

            $payment = Payment::find($id);
            if ($payment != null) {
                $payment->delete();
                return response()->json([
                    'status' => 'true',
                    'msg' => 'your payement is deleted now'
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
