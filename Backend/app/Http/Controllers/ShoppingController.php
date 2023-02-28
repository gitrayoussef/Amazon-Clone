<?php

namespace App\Http\Controllers;

use App\Models\Session;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use App\Http\Resources\ShoppingResource;
use App\Http\Requests\StoreShoppingRequest;

class ShoppingController extends Controller
{
    use HttpResponses;
    
    public function index()
    {
        return ShoppingResource::collection(
            Session::all()
        );
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

        $Session=Session::find($id);
        return  new ShoppingResource($Session);

    }

   

   
    public function update($id,StoreShoppingRequest  $request)
    {
             $Session =Session ::find($id);
        $Session ->update($request->all());
       
    
        return new ShoppingResource($Session );


      
    }


    // public function destroy($id)
    // {
    //     $Category= Category::find($id );
    
    //     return  $Category->delete();
    // }
   
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
