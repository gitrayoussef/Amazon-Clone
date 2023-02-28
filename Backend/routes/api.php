<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ShoppingController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\User\LoginController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\StripPaymentController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\PaypalPaymentController;
use App\Http\Controllers\User\RegisterController;
use App\Http\Controllers\User\ResetPassController;
use App\Http\Controllers\User\EmailVerfyController;
use App\Http\Controllers\User\ForgetPassController;
use App\Http\Controllers\ProductsDiscountController;
use App\Http\Controllers\ProductsInventoryController;
use App\Http\Controllers\Admin\AdminProfileController;
use App\Http\Controllers\GoogleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//public
Route::post('register',[RegisterController::class,'register']);
Route::post('login',[LoginController::class,'login']);
Route::post('admin/login',[AdminController::class,'login']);
Route::post('password/forget-password',[ForgetPassController::class,'forgetPassword']);
Route::post('password/reset-password',[ResetPassController::class,'passwordReset']);
//admin
Route::get('admin/Alladmins',[AdminProfileController::class,'profile'])
->middleware(['auth:sanctum', 'ability:admin']);
//user
Route::get('allUsers',[ProfileController::class,'allUsers'])
->middleware(['auth:sanctum', 'ability:user,admin']);
Route::post('email-verfication',[EmailVerfyController::class,'emaiVerify'])
->middleware(['auth:sanctum', 'ability:user,admin']);
Route::get('email-verfication',[EmailVerfyController::class,'resendEmailVerify'])
->middleware(['auth:sanctum', 'ability:user,admin']);


//products
Route::controller(ProductsController::class)->group(function(){
Route::get('/products',  'index');
Route::get('/products/{products}', 'show');
Route::get('/products/search/{name}',  'search');
Route::get('/products/search/categories/{name}','searchCategories');
Route::post('admin/products/store','store')->middleware(['auth:sanctum', 'ability:admin']);  
Route::put('admin/products/{products}', 'update')->middleware(['auth:sanctum', 'ability:admin']);
Route::delete('admin/products/{products}',  'destroy')->middleware(['auth:sanctum', 'ability:admin']);
});





//categories
Route::controller(CategoriesController::class)->group(function(){
    Route::get('categories', 'index');
    Route::get('categories/search/{name}', 'search');
    Route::get('categories/{categories}', 'show');
    Route::post('admin/categories/store',  'store')->middleware(['auth:sanctum', 'ability:admin']);
    Route::put('admin/categories/{categories}','update')->middleware(['auth:sanctum', 'ability:admin']);
    Route::delete('admin/categories/{categories}', 'destroy')->middleware(['auth:sanctum', 'ability:admin']);
});


//inventory
Route::controller(ProductsInventoryController::class)->group(function(){
    Route::get('/Inventory', 'index');
    Route::post('/Inventory','store');
    Route::get('/Inventory/{Inventory}', 'show');
    Route::put('Inventory/{Inventory}', 'update');
    Route::delete('/Inventory/{Inventory}', 'destroy');
    Route::get('/Inventory/search/{name}', 'search');
});


//discount
Route::controller(ProductsDiscountController::class)->group(function(){
    Route::get('/Discount','index');
    Route::post('/Discount','store');
    Route::get('/Discount/{Discount}','show');
    Route::put('Discount/{Discount}','update');
    Route::delete('/Discount/{Discount}','destroy');
    Route::get('/Discount/search/{name}','search');
});


//shopping
Route::controller(ShoppingController::class)->group(function(){
    Route::get('/shopping','index');
    Route::post('/shopping/store','store');
    Route::get('/shopping/show/{shopping}','show');
    Route::put('shopping/update/{shopping}','update');
    Route::delete('/shopping/destroy/{shopping}','destroy');
});

//cart
Route::controller(CartController::class)->group(function(){
Route::get('/cart', 'index');
Route::post('cart/store', 'store');
Route::get('/cart/show/{cart}', 'show');
Route::put('/cart/update/{cart}', 'update');
Route::delete('/cart/destroy/{cart}', 'destroy');
});

//payment stripe
Route::post('stripe',[StripPaymentController::class,'paymentStripe']);

//paymen paypal
Route::controller(PaypalPaymentController::class)->group(function(){
    Route::post('paypal-payment','paymentPaypal');
    Route::get('paypal-cancel','cancelPaymentPaypal');
    Route::get('paypal-success','successPaymentPaypal');
});

//review
Route::controller(ReviewController::class)->group(function(){
    Route::get('/reviews/show/{id}','show');
    Route::delete('/reviews/destroy/{id}','destroy');
    Route::put('/reviews/update/{id}','update');
    Route::post('/reviews/store','store');
    Route::get('/reviews','index');  
});
//address
Route::controller(AddressController::class)->group(function(){
    Route::get('/address/show/{id}','show');
    Route::delete('/address/destroy/{id}','destroy');
    Route::put('/address/update/{id}','update');
    Route::post('/address/store','store');
    Route::get('/address','index');  
});
//google
Route::controller(GoogleController::class)->group(function(){
    Route::get('google/redirect', 'redirect');
    Route::get('google/callback', 'callback');
});