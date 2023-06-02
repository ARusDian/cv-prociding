<?php

namespace App\Http\Controllers;

use App\Models\HomeTimelineContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeTimelineContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function show() {
        return Inertia::render("Admin/HomeContent/Timeline");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HomeTimelineContent $timeline)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HomeTimelineContent $timeline)
    {
        //
    }
}
