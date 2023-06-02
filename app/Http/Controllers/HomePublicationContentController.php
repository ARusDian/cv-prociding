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
            'linkTo' => 'required',
        ]);

        $image = $request->file('img');
        $imagePath = 'home/publication/' . md5($image->getClientOriginalName() . random_bytes(4)) . '.' . $image->getClientOriginalExtension();
        Storage::disk('public')->put($imagePath, $image->getContent());

        HomePublicationContent::create([
            'cover_img_path' => url('/') . '/' . 'storage/' . $imagePath,
            'link_to' => $request->linkTo,
        ]);

        return redirect()->route('home.publication.show');
    }

    public function update(Request $request, HomePublicationContent $publication)
    {
        $imagePath = "";
        if ($request->hasFile('img')){
            $image = $request->file('img');
            $imagePath = 'home/publication/' . md5($image->getClientOriginalName() . random_bytes(4)) . '.' . $image->getClientOriginalExtension();
            Storage::disk('public')->put($imagePath, $image->getContent());
            
            $toBeDeletedPath = $publication->cover_img_path;
            $toBeDeletedPath = explode('storage/', $toBeDeletedPath)[1];
            Storage::disk('public')->delete($toBeDeletedPath);
        }

        $publication->update([
            'cover_img_path' => $imagePath ? url('/') . '/' . 'storage/' . $imagePath : $publication->cover_img_path,
            'link_to' => $request->linkTo ? $request->linkTo : $publication->link_to,
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
