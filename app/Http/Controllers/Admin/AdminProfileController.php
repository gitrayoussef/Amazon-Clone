<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Notifications\LoginNotification;
use App\Http\Requests\admin\AdminRequest;
use App\Models\Admin;

class AdminProfileController extends Controller
{
    
    public function profile(){
        $user=Admin::all();
        return response()->json(['data'=> $user]);
    }
}
