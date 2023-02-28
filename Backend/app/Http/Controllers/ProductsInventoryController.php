<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Inventroy;



use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ProductsInventoryResource;

class ProductsInventoryController extends Controller
{
    /**use HttpResponses;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return  ProductsInventoryResource::collection(
            Inventroy::all()
        );
    }
    


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
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
    /**
     * Display the specified resource.
    //  *
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
   
    public function show( Request $Inventroy,$id)
    {

        $Inventroy=Inventroy::find($id);
        return  new ProductsInventoryResource($Inventroy);

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
