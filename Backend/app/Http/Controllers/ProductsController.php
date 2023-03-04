<?php

namespace App\Http\Controllers;

use App\Models\Product;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ProductsResource;
use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\CategoriesResource;
use App\Http\Requests\StoreCategoriesRequest;



class ProductsController extends Controller
{

    use HttpResponses;
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
    
    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store( StoreProductRequest $request)
    {
        $request->validated($request->all());
        //   image store  and validation
       
        $file=$request->file('image');
        $name =Str::random(10);
        $url=\Storage::putFileAs('image',$file,$name.'.'.$file->extension());


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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show( Request $product,$id)
    {

        $product=Product::find($id);
        return  new   ProductsResource($product);

    }
    //     public function show(Product $product)
    // {
    //     return  new ProductsResource($product);

    // }

    /**
     * Show the form for editing the specified resource.
     *
    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
    //  */
    // public function update(StoreProductRequest $request,$id)
    // {
    //     // $product = $request->validated($request->all());
        
    //     // if($request->hasFile('image')){
    //     //         $this->deleteImage($product->image);
    //     //         $validatedData['image']=$this->saveImage($request->file('image'));
    //     //     };
        


    //     //     $product->update($validatedData);
    //     //     $product =$product->refresh();
    //     //     $product->image? $product->image =$product->image_url:'';
    //     //     $product->image_url;

    //     //     $product=Product::find($id);


    //     $product->update($request->all());
    //     return new ProductsResource($product);

      
    //     }
        public function update($id,Request $request)
        {
            $product=Product::find($id);
            $product->update( [  'name' => $request->name,
            'desc' => $request->desc,
            'price' => $request->price,
           'category_id' =>$request->category_id,
           'discount_id'=>$request->discount_id,
           'inventory_id'=>$request->inventory_id,
        //    'image' => $url,
        //    'imagepath' => env('APP_URL').'/'.$url,
             ]);
            $product->update($request->all());
            return  new   ProductsResource($product);
    
          
        }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
   
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
        return Product::join('product_categories', 'products.category_id', '=', 'product_categories.id')
        ->where('product_categories.name', $category)
        ->get();
        
        }
    

     }
        
    

     






          
        
           
    
    //     if ($name) {
    //        return Product::where('name', $name)
    //     ->orWhere('name',"like","$name%",$name)->
        
    //     orWhere('category_id',$name)->orWhere('category_id',$name)->get();
    //     $products = Product::whereHas('category', function($query) {
    //         $query->where('name', '=', 'Category Name');
    //     })->get();
     
    //     }
    
       
    
    //  


   
        
 
      



  





