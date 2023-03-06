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
        return Socialite::driver('google')->redirect();
    }

    public function callback(Request $request)
    {
<<<<<<< HEAD
        try{
            $googleUser = Socialite::with('google')->stateless()->user();
            //return response()->json($googleUser);
            $user = User::where('email', $googleUser->emil)->first();
             if ($user!=null) {
                $user1=Auth::user();
                $user1->tokens()->delete();
                $user1->notify(new LoginNotification());
                $success['token']=$user1->userFromToken('user',['user'])->plainTextToken;
                $success['msg']=$user->name;
                $success['success']=true;
                return response()->json($success,200);
    
            } else {
                return response()->json([
                    'msg'=>"need to register"
                ]);
             
            }  
        }catch (Exception $ex) {
            return response()->json(['status' => 'error', 'expcetion' => $ex->getMessage(), 'msg' => ' google failed'], 500);
        }
        
=======
  try{
    $token = $request->input('access_token');
    $providerUser = Socialite::driver('google')->stateless()->user();
    $user = User::where('email',  $providerUser->email)->first();
    if($user!=null){
        $user->tokens()->delete();
        $user->notify(new LoginNotification());
        $token = $user->createToken('user',['user'])->plainTextToken;
        return response()->json([
            'success' => true,
            'msg' => 'you are logged in now',
            'token' => $token,
        ]);
    }else{
        return response()->json([
            'success' => true,
            'msg' => 'you need to register',
        ]);
>>>>>>> 7f6c42b75078b9ef93058ed47357925551bb3f5e
    }

  }catch (Exception $ex) {
    return response()->json(['status' => 'error', 'expcetion' => $ex->getMessage(), 'msg' => 'failed to get allCarts'], 500);
}

    
    }
        
    
}
