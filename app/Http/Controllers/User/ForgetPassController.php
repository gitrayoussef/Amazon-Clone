<?php

namespace App\Http\Controllers\User;



use App\Models\User;
use App\Http\Controllers\Controller;
use App\Notifications\resetpassnotify;
use App\Http\Requests\user\ForgetPassRequest;

class ForgetPassController extends Controller
{
    public function forgetPassword(ForgetPassRequest $request){
      
        $input=$request->only('email');
        $user=User::where('email',$input)->first();
        $user->notify( new resetpassnotify());
        $success['success']=true;
        return response()->json($success,200);

    }
}
