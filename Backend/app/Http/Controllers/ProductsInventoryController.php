<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Product;



use App\Models\Inventroy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ProductsInventoryResource;

class ProductsInventoryController extends Controller
{
   
    public function index()
    {


        try {
            $allInventroy= ProductsInventoryResource::collection(
                Inventroy::all()
          );
            if ($allInventroy!= null) {
                return response()->json([
                    'status' => 'true',
                    'data' => $allInventroy,
                ], 201);
            } else {
                return response()->json([
                    'status' => 'true',
                    'msg' => 'there is no reviews now '
                ],201);
            }
        } catch (Exception $ex) {
            return response()->json(['status' => 'error', 'expcetion' => $ex->getMessage(), 'msg' => 'failed to get reviews'], 500);
        }
    
    }
    


    public function store( Request $request)
    {
        // $request->validated($request->all());
        
        $validator = Validator::make($request->all(), [ 

            'quantity' => 'required',  


        ]);

        if ($validator->fails()) {  

            return response()->json([  

                'success' => false,  

                'message' => $validator->errors(),  

            ], 400);  

        } else {  


        $Inventroy = Inventroy::create([
         
    
            'quantity'=> $request->quantity,
            
            
        ]);

        return new ProductsInventoryResource($Inventroy);
    }
    }
   
   
    public function show( Request $Inventroy,$id)
    {


        try{
            $Inventroy=Inventroy::find($id);
            if($Inventroy!=null){
                return  new   ProductsInventoryResource($Inventroy);
            }else{
                return response()->json([
                    'status' => 'true',
                    'msg' => 'no records with this id ,please check id ! '
                ],201);
            }  
        }catch (Exception $ex) {
            return response()->json(['status' => 'error', 'expcetion' => $ex->getMessage(), 'msg' => 'view process failed'], 500);
        }



    }

    public function update($id,Request $request)
    {
        $Inventroy=Inventroy::find($id);
        $Inventroy->update( ['quantity'=> $request->quantity, ]);
        return new ProductsInventoryResource($Inventroy);

      
    }

    public function destroy($id)
    {
        $Inventroy = Inventroy::find($id );
        return  $Inventroy->delete();
    }

    public function search($name)
    {    
    
        if ($name) {
            return Inventroy:: Where('id',$name)->get();
     
        }
    
       
     }



}