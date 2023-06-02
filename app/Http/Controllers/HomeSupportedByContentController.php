<?php

namespace App\Http\Controllers;

use App\Models\HomeSupportedByContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeSupportedByContentController extends Controller
{
    public function show()
    {
        $supports = HomeSupportedByContent::all();
        return Inertia::render('Admin/HomeContent/Support', [
            'supports' => $supports ? $supports : [],
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
        $imagePath = 'home/support/' . md5($image->getClientOriginalName() . random_bytes(4)) . '.' . $image->getClientOriginalExtension();
        Storage::disk('public')->put($imagePath, $image->getContent());

        HomeSupportedByContent::create([
            'img_path' => url('/') . '/' . 'storage/' . $imagePath,
        ]);

        return redirect()->route('home.support.show')->with("success", "Timeline created successfully");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HomeSupportedByContent $support)
    {
        $request->validate([
            'img' => 'required',
        ]);
        $toBeDeletedPath = $support->img_path;
        $toBeDeletedPath = explode('storage/', $toBeDeletedPath)[1];
        Storage::disk('public')->delete($toBeDeletedPath);

        $image = $request->file('img');
        $imagePath = 'home/support/' . md5($image->getClientOriginalName() . random_bytes(4)) . '.' . $image->getClientOriginalExtension();
        Storage::disk('public')->put($imagePath, $image->getContent());

        $support->update([
            'img_path' => url('/') . '/' . 'storage/' . $imagePath,
        ]);
        $support->save();

        return redirect()->route('home.support.show');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HomeSupportedByContent $support)
    {
        $toBeDeletedPath = $support->img_path;
        $toBeDeletedPath = explode('storage/', $toBeDeletedPath)[1];
        Storage::disk('public')->delete($toBeDeletedPath);
        $support->delete();
        return redirect()->route('home.support.show');
    }
}
