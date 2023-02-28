<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StripPaymentRequest;
use Exception;
use Strip;
use Stripe\Stripe;

class StripPaymentController extends Controller
{
    public function paymentStripe(StripPaymentRequest $request){
        
        try{
            Stripe::setApiKey(env('STRIPE_SECRET'));
            $stripe = new \Stripe\StripeClient(
                env('STRIPE_SECRET')
              );
              $res=$stripe->tokens->create([
                'card' => [
                  'number' => $request->card_no,
                  'exp_month' =>  $request->exp_month,
                  'exp_year' => $request->exp_year,
                  'cvc' => $request->cvv_no,
                ],
              ]);

              $response=$stripe->charges->create([
                'amount' =>$request->amount ,
                'currency' =>'USD',
                'source' => $res->id,
                'description' => $request->desc,
              ]);
              return response()->json(['status'=>$response->status,'transction'=>'successfuly transction'],201);
        }catch(Exception $ex){
           return response()->json(['status'=>'error','expcetion'=>$ex->getMessage(),'transction'=>'faild transction'],500);
        }

    }
}
