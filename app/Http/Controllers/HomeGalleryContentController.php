<?php

namespace App\Http\Controllers;

use App\Models\HomeGalleryContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeGalleryContentController extends Controller
{
    public function show()
    {
        $galleries = HomeGalleryContent::all();
        return Inertia::render('Admin/HomeContent/Gallery', [
            'galleries' => $galleries ? $galleries : [],
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
        $imagePath = 'home/gallery/' . md5($image->getClientOriginalName() . random_bytes(4)) . '.' . $image->getClientOriginalExtension();
        Storage::disk('public')->put($imagePath, $image->getContent());

        HomeGalleryContent::create([
            'img_path' => url('/') . '/' . 'storage/' . $imagePath,
        ]);

        return redirect()->route('home.gallery.show');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HomeGalleryContent $gallery)
    {
        $request->validate([
            'img' => 'required',
        ]);
        $toBeDeletedPath = $gallery->img_path;
        $toBeDeletedPath = explode('storage/', $toBeDeletedPath)[1];
        Storage::disk('public')->delete($toBeDeletedPath);

        $image = $request->file('img');
        $imagePath = 'home/gallery/' . md5($image->getClientOriginalName() . random_bytes(4)) . '.' . $image->getClientOriginalExtension();
        Storage::disk('public')->put($imagePath, $image->getContent());

        $gallery->update([
            'img_path' => url('/') . '/' . 'storage/' . $imagePath,
        ]);
        $gallery->save();

        return redirect()->route('home.gallery.show');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HomeGalleryContent $gallery)
    {
        $toBeDeletedPath = $gallery->img_path;
        $toBeDeletedPath = explode('storage/', $toBeDeletedPath)[1];
        Storage::disk('public')->delete($toBeDeletedPath);
        $gallery->delete();
        return redirect()->route('home.gallery.show');
    }
}
