<?php

namespace App\Http\Controllers;

use App\Models\HomeHeaderContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HomeHeaderContentController extends Controller
{
    public function store(Request $request)
    {
        // $request->validate([
        //     "date_stamp" => "required",
        //     "input_logo_path" => "required",
        //     "title" => "required",
        //     "subtitle" => "required"
        // ]);
        
        $logo = $request->file("input_logo_path");
        $logoName = md5(rand(1, 10)) . "." . $logo->getClientOriginalExtension();
        $logoPath = "home/" . $logoName;
        Storage::disk("public")->put($logoPath, $logo->getContent());

        HomeHeaderContent::create([
            "date_stamp" => $request->date_stamp,
            "logo_path" => url('/') . "/" . "storage/" . $logoPath,
            "title" => $request->title,
            "subtitle" => $request->subtitle
        ]);
        
        return redirect()->route("home.index");
    }

    public function update(Request $request, HomeHeaderContent $homeHeaderContent)
    {
        // $header = $homeHeaderContent->first();
        // dd($request->all(), $header);
        return response()->json([
            "message" => "success",
            "data" => $request->all(),
            "homeHeaderContent" => $homeHeaderContent
        ], 200);

    }

    public function destroy(HomeHeaderContent $homeHeadeContent)
    {
        //
    }
}
