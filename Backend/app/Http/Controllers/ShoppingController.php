<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Session;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use App\Http\Resources\ShoppingResource;
use App\Http\Requests\StoreShoppingRequest;

class ShoppingController extends Controller
{
   
    
    public function index()
    {


        try {

            $allSession = ShoppingResource::collection(
                Session::all()
          );
           
            if ($allSession!= null) {
                return response()->json([
                    'status' => 'true',
                    'data' => $allSession,
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
    


    public function store( StoreShoppingRequest $request)
    {
        $request->validated($request->all());

        $Session= Session::create([
         
            'user_id' => $request->user_id,
            'total' => $request->total,
            
           
        ]);

        return new ShoppingResource($Session);
    }

    
    public function show( Request $Session,$id)
    {


        try{
            $Session=Session::find($id);
            if($Session!=null){
                return   new ShoppingResource($Session);
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

   

   
    public function update($id,StoreShoppingRequest  $request)
    {
             $Session =Session ::find($id);
        $Session ->update($request->all());
       
    
        return new ShoppingResource($Session );


      
    }


 
   
    public function destroy($id)
    {
        $Session= Session::find($id );
     
        return  $Session->delete();
    }

    public function search($name)
    {    
       
    
        if ($name) {
            return Session::where('name', $name)
            ->orWhere('name',"like","$name%",$name)->
            
            orWhere('id',$name)->get();
     
        }
    

     }
    
}
