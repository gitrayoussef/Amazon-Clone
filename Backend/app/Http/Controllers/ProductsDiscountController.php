<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Discount;
use Illuminate\Http\Request;
use App\Http\Requests\ProductsDiscountRequest;
use App\Http\Resources\ProductsDiscountResource;

class ProductsDiscountController extends Controller
{
   
    public function index()
    {

        try {
            $allDiscount = ProductsDiscountResource::collection(
                Discount::all()
          );
            if ($allDiscount!= null) {
                return response()->json([
                    'status' => 'true',
                    'data' => $allDiscount,
                ], 201);
            } else {
                return response()->json([
                    'status' => 'true',
                    'msg' => 'there is no Discount  now '
                ],201);
            }
        } catch (Exception $ex) {
            return response()->json(['status' => 'error', 'expcetion' => $ex->getMessage(), 'msg' => 'failed to get Discount '], 500);
        }


        
    }

  
      public function store(ProductsDiscountRequest $request)
    {
        $request->validated($request->all());

        $Discount = Discount::create([
            'name' => $request->name,
            'desc' => $request->desc,
            'discount_percent' => $request->discount_percent,
            'active' => $request->active,
            
     
          
           
        ]);
    
            return response()->json("success",200);
        return new ProductsDiscountResource($Discount);}
  


    public function show(Request $Discount,$id)

    {     
        
        try{
            $Discount=Discount::find($id);
            if( $Discount!=null){
                return new ProductsDiscountResource($Discount);
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
  

     public function update($id,ProductsDiscountRequest $request)
     {
         
         $Discount=Discount::find($id);
         $Discount->update($request->all());
        
     
         return new ProductsDiscountResource($Discount);
 
       
     }
   
    
    public function destroy($id)
    {
        $Discount= Discount::find($id );
     
        return  $Discount->delete();
    }

    public function search($name)
    {    
       
    
        if ($name) {
            return Discount::where('name', $name)
            ->orWhere('name',"like","$name%",$name)->
            
            orWhere('id',$name)->get();
     
        }
    

     }

}