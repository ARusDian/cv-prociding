<?php

namespace App\Http\Controllers;

use App\Models\HomeNewsContent;
use Illuminate\Http\Request;

class HomeNewsContentController extends Controller
{
    public function show(HomeNewsContent $homeNewsContent)
    {
        $homeNewsContent = HomeNewsContent::all()->first();
        
    }

    public function store(Request $request)
    {
        //
    }

    public function update(Request $request, HomeNewsContent $homeNewsContent)
    {
        //
    }

    public function destroy(HomeNewsContent $homeNewsContent)
    {
        //
    }
}
