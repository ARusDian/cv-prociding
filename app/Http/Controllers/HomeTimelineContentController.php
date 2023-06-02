<?php

namespace App\Http\Controllers;

use App\Models\HomeTimelineContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeTimelineContentController extends Controller
{
    public function show()
    {
        $timelines = HomeTimelineContent::all();
        return Inertia::render('Admin/HomeContent/Timeline', [
            'timelines' => $timelines ? $timelines : [],
        ]);
    }

    #store function
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'img' => 'required',
        ]);

        $image = $request->file('img');
        $imagePath = 'home/timeline/' . md5(rand(1,10)) . '.' . $image->getClientOriginalExtension();
        Storage::disk('public')->put($imagePath, $image->getContent());

        HomeTimelineContent::create([
            'img_path' => url('/') . '/' . 'storage/' . $imagePath,
        ]);

        return redirect()->route('home.timeline.show')->with("success", "Timeline created successfully");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HomeTimelineContent $timeline)
    {
        $request->validate([
            'img' => 'required',
        ]);
        $toBeDeletedPath = $timeline->img_path;
        $toBeDeletedPath = explode('storage/', $toBeDeletedPath)[1];
        Storage::disk('public')->delete($toBeDeletedPath);

        $image = $request->file('img');
        $imagePath = 'home/timeline/' . md5(rand(1,10)) . '.' . $image->getClientOriginalExtension();
        Storage::disk('public')->put($imagePath, $image->getContent());

        $timeline->update([
            'img_path' => url('/') . '/' . 'storage/' . $imagePath,
        ]);
        $timeline->save();

        return redirect()->route('home.timeline.show');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HomeTimelineContent $timeline)
    {
        $toBeDeletedPath = $timeline->img_path;
        $toBeDeletedPath = explode('storage/', $toBeDeletedPath)[1];
        Storage::disk('public')->delete($toBeDeletedPath);
        $timeline->delete();
        return redirect()->route('home.timeline.show');
    }
}
