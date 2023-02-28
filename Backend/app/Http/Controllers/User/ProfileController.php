<?php

namespace App\Http\Controllers\User;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\user\ProfileUpdateRequest;


class ProfileController extends Controller
{

    public function allUsers(){
        $user=User::all();
        return response()->json(['data'=> $user]);
    }
}
