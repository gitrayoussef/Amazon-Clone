<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Exception;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function index()
    {
        
        try {
            $allAddress = Address::all();
            if ($allAddress != null) {
                return response()->json([
                    'status' => 'true',
                    'data' => $allAddress,
                ], 201);
            } else {
                return response()->json([
                    'status' => 'true',
                    'msg' => 'there is no reviews now '
                ],201);
            }
        } catch (Exception $ex) {
            return response()->json(['status' => 'error', 'expcetion' => $ex->getMessage(), 'msg' => 'failed to get all adresses'], 500);
        }

    }

    public function store(Request $request)
    {
        $address = new Address();
        $address->user_id = $request->user_id;
        $address->address_line1 = $request->address_line1;
        $address->address_line2 = $request->address_line2;
        $address->city = $request->city;
        $address->postal_code = $request->postal_code;
        $address->country = $request->country;
        $address->telephone = $request->telephone;
        $address->mobile = $request->mobile;
        $address->save();
        return response()->json([
            'status' => 'true',
            'msg' => 'your address data stored successfuly'
        ], 201);
    }

    public function show($id)
    {
        try {
            $address = Address::find($id);
            if ($address != null) {
                return response()->json([
                    'status' => 'true',
                    'user' => $address,
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
            $address = Address::find($id);
            if ($address != null) {
                $address->user_id = $request->user_id;
                $address->address_line1 = $request->address_line1;
                $address->address_line2 = $request->address_line2;
                $address->city = $request->city;
                $address->postal_code = $request->postal_code;
                $address->country = $request->country;
                $address->telephone = $request->telephone;
                $address->mobile = $request->mobile;
                $address->save();
                return response()->json([
                    'status' => 'true',
                    'msg' => 'your address is updated now'
                ],201);
            } else {
                return response()->json([
                    'status' => 'true',
                    'msg' => 'no records with this id ,please check id ! '
                ],201);
            }
        } catch (Exception $ex) {
            return response()->json(['status' => 'error', 'expcetion' => $ex->getMessage(), 'msg' => 'address update process failed'], 500);
        }
    }

    public function destroy($id)
    {
        try {

            $address = Address::find($id);
            if ($address != null) {
                $address->delete();
                return response()->json([
                    'status' => 'true',
                    'msg' => 'your address is deleted now'
                ],201);
            } else {
                return response()->json([
                    'status' => 'true',
                    'msg' => 'no records with this id ,please check id ! '
                ],201);
            }
        } catch (Exception $ex) {
            return response()->json(['status' => 'error', 'expcetion' => $ex->getMessage(), 'msg' => 'address delete process failed'], 500);
        }
    }
}
