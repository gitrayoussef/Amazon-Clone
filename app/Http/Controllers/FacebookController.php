<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Notifications\LoginNotification;
use Laravel\Socialite\Facades\Socialite;

class FacebookController extends Controller
{
      public function redirect(){
        return Socialite::driver('facebook')->redirect();
      }
      public function callback(Request $request){
      
        try{
          $token = $request->input('access_token');
          $providerUser = Socialite::driver('facebook')->stateless()->user();
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
          }
      
        }catch (Exception $ex) {
          return response()->json(['status' => 'error', 'expcetion' => $ex->getMessage(), 'msg' => 'failed to get allCarts'], 500);
      }

      }
}
