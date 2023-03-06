<?php

namespace App\Http\Controllers;

use Exception;

use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\ProductsResource;
use App\Http\Requests\StoreProductRequest;




class ProductsController extends Controller
{


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       
            $product = Product::paginate();
            
            return  ProductsResource::collection($product);
          

   
    }
    
    
    public function store( StoreProductRequest $request)
    {
        $request->validated($request->all());
        //   image store  and validation
       
        $file=$request->file('image');
        $name =Str::random(10);
        $url=Storage::putFileAs('image',$file,$name.'.'.$file->extension());


        $product = Product::create([
            // 'user_id' => Auth::user()->id,
            'name' => $request->name,
            'rating' => $request->rating,
            'desc' => $request->desc,
            'price' => $request->price,
           'category_id' =>$request->category_id,
           'discount_id'=>$request->discount_id,
           'inventory_id'=>$request->inventory_id,
           'image' => $url,
           'imagepath' => env('APP_URL').'/'.$url,
            

        ]);
        
        return new ProductsResource($product);
    }

   
public function show( Request $product,$id)
{

try{
        $product=Product::find($id);
        if($product!=null){
            return  new   ProductsResource($product);
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
            $product=Product::find($id);
            $product->update($request->all('name','desc','price','category_id','discount_id', 'inventory_id','image','imagepath' ));
         
            $product->update($request->all());
            return  new   ProductsResource($product);
    
          
        }

   
    public function destroy($id)
    {
        $product= Product::find($id );
    
        return  $product->delete();
    }
   

    public function search($name)
    {    
         
            
     if ($name) {
           return Product::where('name', $name)
        ->orWhere('name',"like","$name%",$name)->
        
        orWhere('category_id',$name)->orWhere('category_id',$name)->get();
      
     
        }
    
    }

     public function searchCategories($category){

        $category = Product::select(
            "products.category_id",
            "products.name",
            "products.price",
            "products.desc",
            "products.image",
            "products.imagepath"
        )
        ->join('product_categories', 'products.category_id', '=', 'product_categories.id')
        ->where('product_categories.name', $category)
        ->get();
       
        try {  
        if ($category != null) {
            return response()->json([
                'status' => 'true',
                'data' => $category ,
            ], 201);
        } else {
            return response()->json([
                'status' => 'true',
                'msg' => 'there is no reviews now '
            ],201);
        }
    } catch (Exception $ex) {
        return response()->json(['status' => 'error', 'expcetion' => $ex->getMessage(), 'msg' => 'failed to get allCarts'], 500);
    }
        
}}