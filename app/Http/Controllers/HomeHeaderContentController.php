<?php

namespace App\Http\Controllers;

use App\Models\HomeHeaderContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeHeaderContentController extends Controller
{
  public function show()
  {
	$homeHeader = HomeHeaderContent::all()->first();
	return Inertia::render('Admin/HomeContent/Header', [
	  'header' => $homeHeader,
	]);
  }

  public function store(Request $request)
  {
    $request->validate([
      'date_stamp' => 'required',
      'title' => 'required',
      'subtitle' => 'required',
      'input_background_image' => 'required|image|mimes:jpeg,png,jpg',
      'input_logo_path' => 'required|image|mimes:jpeg,png,jpg',
    ]);

    $logo = $request->file('input_logo_path');
    $logoName = md5(rand(1, 10)) . '.' . $logo->getClientOriginalExtension();
    $logoPath = 'home/header/' . $logoName;
    Storage::disk('public')->put($logoPath, $logo->getContent());

    $backgroundImage = $request->file('input_background_image');
    $backgroundImageName = md5(rand(1, 10)) . '.' . $backgroundImage->getClientOriginalExtension();
    $backgroundImagePath = 'home/header/' . $backgroundImageName;
    Storage::disk('public')->put($backgroundImagePath, $backgroundImage->getContent());

    HomeHeaderContent::create([
      'date_stamp' => $request->date_stamp,
      'logo_path' => url('/') . '/' . 'storage/' . $logoPath,
      'background_image_path' => url('/') . '/' . 'storage/' . $backgroundImagePath,
      'title' => $request->title,
      'subtitle' => $request->subtitle,
    ]);

    return redirect()->route('home.keynote.show');
  }

  public function update(Request $request, HomeHeaderContent $homeHeader)
  {
    $currentLogoPath = '';
    if ($request->logo_path != $request->input_logo_path) {
      $currentLogoPath = explode('storage/', $request->logo_path);
      $currentLogoPath = $currentLogoPath[1];
      Storage::disk('public')->delete($currentLogoPath);

      $logo = $request->file('input_logo_path');
      $logoName = md5(rand(1, 10)) . '.' . $logo->getClientOriginalExtension();
      $logoPath = 'home/header/' . $logoName;
      Storage::disk('public')->put($logoPath, $logo->getContent());
      $homeHeader->logo_path = url('/') . '/' . 'storage/' . $logoPath;
    }

    $currentBackgroundImagePath = '';
    if ($request->background_image_path != $request->input_background_image) {
      $currentBackgroundImagePath = explode('storage/', $request->background_image_path);
      $currentBackgroundImagePath = $currentBackgroundImagePath[1];
      Storage::disk('public')->delete($currentBackgroundImagePath);

      $backgroundImage = $request->file('input_background_image');
      $backgroundImageName = md5(rand(1, 10)) . '.' . $backgroundImage->getClientOriginalExtension();
      $backgroundImagePath = 'home/header/' . $backgroundImageName;
      Storage::disk('public')->put($backgroundImagePath, $backgroundImage->getContent());
      $homeHeader->background_image_path = url('/') . '/' . 'storage/' . $backgroundImagePath;
    }

    $homeHeader->update([
      'date_stamp' => $request->date_stamp,
      'title' => $request->title,
      'subtitle' => $request->subtitle,
    ]);

    $homeHeader->save();
    return redirect()->route('home.keynote.show');
  }

  public function destroy(HomeHeaderContent $homeHeadeContent)
  {
    //
  }
}
