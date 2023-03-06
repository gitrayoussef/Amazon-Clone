<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Ichtrojan\Otp\Otp;
use App\Models\FrontUser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Notifications\EmailVerfyNotify;
use App\Http\Requests\user\EmailVerfyRequest;

class EmailVerfyController extends Controller
{
    private $otp;
    public function __construct()
    {
        $this->otp=new Otp;
    }
    public function resendEmailVerify(Request $request){
      $request->user()->notify(new EmailVerfyNotify());
      $success['success']=true;
      return response()->json($success,200);
    }
    public function emaiVerify(EmailVerfyRequest $request){
       $otp2=$this->otp->validate($request->email,$request->otp);
       if(!$otp2->status){
        return response()->json(['error'=>$otp2],401);
       }
       $user=User::where('email',$request->email)->first();
       $user->update(['email_verified_at'=>now()]);
       $success['success']=true;
       $success['state']='you are verified now';
       return response()->json($success,200);
    }
}
