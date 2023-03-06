<?php

namespace App\Http\Controllers\User;


use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Notifications\EmailVerfyNotify;
use App\Http\Requests\user\RegistrationRequest;

class RegisterController extends Controller
{
    public function register(RegistrationRequest $request){
        $newuser=$request->validated();
        $newuser['password']=Hash::make($newuser['password']);
        $user=User::Create($newuser);
        $success['token']=$user->createToken('user',['user'])->plainTextToken;
        $success['name']=$user->first_name;
        $success['success']=true;
        $user->notify(new EmailVerfyNotify());
        return response()->json($success,200);
     }
}
