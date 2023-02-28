<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index()
    {
        
        try {
            $allReview = Review::all();
            if ($allReview != null) {
                return response()->json([
                    'status' => 'true',
                    'data' => $allReview,
                ], 201);
            } else {
                return response()->json([
                    'status' => 'true',
                    'msg' => 'there is no reviews now '
                ],201);
            }
        } catch (Exception $ex) {
            return response()->json(['status' => 'error', 'expcetion' => $ex->getMessage(), 'msg' => 'failed to get reviews'], 500);
        }

    }

    public function store(Request $request)
    {
        $review = new Review();
        $review->rate = $request->rate;
        $review->desc = $request->desc;
        $review->user_id = $request->user_id;
        $review->product_id = $request->product_id;
        $review->save();
        return response()->json([
            'status' => 'true',
            'msg' => 'data stored successfuly'
        ], 201);
    }

    public function show($id)
    {
        try {
            $review = Review::find($id);
            if ($review != null) {
                return response()->json([
                    'status' => 'true',
                    'user' => $review,
                ], 201);
            } else {
                return response()->json([
                    'status' => 'true',
                    'msg' => 'no records with this id ,please check id ! '
                ],201);
            }
        } catch (Exception $ex) {
            return response()->json(['status' => 'error', 'expcetion' => $ex->getMessage(), 'msg' => 'view process failed'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $review = Review::find($id);
            if ($review != null) {
                $review->rate = $request->rate;
                $review->desc = $request->desc;
                $review->save();
                return response()->json([
                    'status' => 'true',
                    'msg' => 'your review is updated now'
                ],201);
            } else {
                return response()->json([
                    'status' => 'true',
                    'msg' => 'no records with this id ,please check id ! '
                ],201);
            }
        } catch (Exception $ex) {
            return response()->json(['status' => 'error', 'expcetion' => $ex->getMessage(), 'msg' => 'update process failed'], 500);
        }
    }

    public function destroy($id)
    {
        try {

            $review = Review::find($id);
            if ($review != null) {
                $review->delete();
                return response()->json([
                    'status' => 'true',
                    'msg' => 'your review is deleted now'
                ],201);
            } else {
                return response()->json([
                    'status' => 'true',
                    'msg' => 'no records with this id ,please check id ! '
                ],201);
            }
        } catch (Exception $ex) {
            return response()->json(['status' => 'error', 'expcetion' => $ex->getMessage(), 'msg' => 'delete process failed'], 500);
        }
    }
}












