<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use Illuminate\Http\Request;
use App\Http\Requests\ProductsDiscountRequest;
use App\Http\Resources\ProductsDiscountResource;
use App\Http\Controllers\ProductsDiscountController;

use HttpResponses;
class ProductsDiscountController extends Controller
{
   
    public function index()
    {
       
        return ProductsDiscountResource::collection(
            Discount::all()
            
        );
        // return $this->error('', 'Credentials do not match', 401);
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
        // return $this->success([
            return response()->json("success",200);
        return new ProductsDiscountResource($Discount);}
  


    public function show(Request $Discount,$id)
    {       $Discount=Discount::find($id);
        return new ProductsDiscountResource($Discount);

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
