<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Notifications\LoginNotification;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function callback()
    {
        $googleUser = Socialite::driver('google')->user();
        dd($googleUser);
        $user = User::where('email', $googleUser->emil)->first();
        if (!$user) {
            $user1=Auth::user();
            $user1->tokens()->delete();
            $user1->notify(new LoginNotification());
            $success['token']=$user1->createToken('user',['user'])->plainTextToken;
            $success['msg']=$user->name;
            $success['success']=true;
            return response()->json($success,200);

        } else {
            return response()->json([
                'msg'=>"need to register"
            ]);
         
        } 
    }
}
