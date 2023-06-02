<?php

namespace App\Http\Controllers;

use App\Models\HomePublicationContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomePublicationContentController extends Controller
{
    public function show()
    {
        $publications = HomePublicationContent::all();
        return Inertia::render('Admin/HomeContent/Publication', [
            'publications' => $publications ? $publications : [],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'img' => 'required',
            'link_to' => 'required',
        ]);

        $image = $request->file('img');
        $imagePath = 'home/publication/' . md5(rand(1,10)) . '.' . $image->getClientOriginalExtension();
        Storage::disk('public')->put($imagePath, $image->getContent());

        HomePublicationContent::create([
            'cover_img_path' => url('/') . '/' . 'storage/' . $imagePath,
        ]);

        return redirect()->route('home.publication.show')->with("success", "Timeline created successfully");
    }

    public function update(Request $request, HomePublicationContent $publication)
    {
        $toBeDeletedPath = $publication->cover_img_path;
        $toBeDeletedPath = explode('storage/', $toBeDeletedPath)[1];
        Storage::disk('public')->delete($toBeDeletedPath);

        $image = $request->file('img');
        $imagePath = 'home/publication/' . md5(rand(1,10)) . '.' . $image->getClientOriginalExtension();
        Storage::disk('public')->put($imagePath, $image->getContent());

        $publication->update([
            'cover_img_path' => url('/') . '/' . 'storage/' . $imagePath,
            'link_to' => $request->link_to ? $request->link_to : $publication->link_to,
        ]);
        $publication->save();

        return redirect()->route('home.publication.show');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HomePublicationContent $publication)
    {
        $toBeDeletedPath = $publication->cover_img_path;
        $toBeDeletedPath = explode('storage/', $toBeDeletedPath)[1];
        Storage::disk('public')->delete($toBeDeletedPath);
        $publication->delete();
        return redirect()->route('home.publication.show');
    }
}
