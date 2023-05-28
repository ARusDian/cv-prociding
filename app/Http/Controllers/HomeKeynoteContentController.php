<?php

namespace App\Http\Controllers;

use App\Models\HomeKeynoteContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeKeynoteContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function show()
    {
        $keynotes = HomeKeynoteContent::all()->first();
        return Inertia::render('Admin/HomeContent/Keynote', [
        'keynotes' => $keynotes ? $keynotes : [],
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HomeKeynoteContent $homeKeynoteContent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HomeKeynoteContent $homeKeynoteContent)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HomeKeynoteContent $homeKeynoteContent)
    {
        //
    }
}
