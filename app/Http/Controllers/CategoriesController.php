<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CategoriesResource;
use App\Http\Requests\StoreCategoriesRequest;

class CategoriesController extends Controller
{
    
  
    public function index()
    {

        try {
            $allCategory = CategoriesResource::collection(
                Category::all()
          );
            if ($allCategory!= null) {
                return response()->json([
                    'status' => 'true',
                    'data' => $allCategory,
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
    


    public function store( StoreCategoriesRequest $request)
    {
        $request->validated($request->all());

        $Category = Category::create([
         
            'name' => $request->name,
            'desc' => $request->desc,
            
           
        ]);

        return new CategoriesResource($Category);
    }

 
    public function show( Request $Category,$id)
    {
        try{
            $Category=Category::find($id);
            if($Category!=null){
                return  new   CategoriesResource($Category);
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
        $Category=Category::find($id);
        $Category->update($request->all());
        return new CategoriesResource($Category);;

      
    }
   
    public function destroy($id)
    {
        $Category= Category::find($id );
    
        return  $Category->delete();
    }
   
 
   
    public function search($name)
    {    

            if ($name) {
            return Category::where('name', $name)
            ->orWhere('name',"like","$name%",$name)->
            
            orWhere('id',$name)->get();
        }
    
     }

}
