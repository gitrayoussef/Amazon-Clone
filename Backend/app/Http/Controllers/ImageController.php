<?php

namespace App\Http\Controllers;

use Storage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\ImageUploadRequest;

class ImageController extends Controller
{
    public function upload(Request $request){
        $file=$request->file('image');
        $name =Str::random(10);
        $url=\Storage::putFileAs('image',$file,$name.'.'.$file->extension());
        return env('APP_URL').'/'.$url;

    }
}