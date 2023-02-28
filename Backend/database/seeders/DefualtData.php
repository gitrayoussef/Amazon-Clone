<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DefualtData extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data['first_name']='mo';
        $data['last_name']='essam';
        $data['email']='admin@gmail.com'; 
        $data['password']=Hash::make('test123!');
        Admin::create($data);

        $cdata['first_name']='adham';
        $cdata['last_name']='adam';
        $cdata['email']='user@gmail.com';
        $cdata['gender']='male';
        $cdata['password']=Hash::make('test123!');
        User::create($cdata);
    }
}
