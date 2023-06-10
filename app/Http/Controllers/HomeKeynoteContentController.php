<?php

namespace App\Http\Controllers;

use App\Models\HomeKeynoteContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeKeynoteContentController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function show()
  {
    $keynotes = HomeKeynoteContent::all();
    return Inertia::render('Admin/HomeContent/Keynote', [
      'keynotes' => $keynotes ? $keynotes : [],
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $existingKeynotes = HomeKeynoteContent::all();
    $request->validate([
      '*.title' => 'required',
      '*.name' => 'required',
      '*.affiliation' => 'required',
      '*.rank' => 'required',
    ]);

    $keynotes = $request->all();

		// foreach($existingKeynotes as $existingKeynote) {
		// 	if (!in_array($existingKeynote->id, array_column($keynotes, 'id'))) {
		// 		$existingKeynoteImage = explode('storage/', $existingKeynote->img_path);
    //   	$existingKeynoteImage = $existingKeynoteImage[1];
		// 		Storage::disk('public')->delete($existingKeynoteImage);
		// 		$existingKeynote->delete();
		// 	}
		// }

    for($i = 0; $i <= count($existingKeynotes) - 1; $i++) {
      if(!in_array($existingKeynotes[$i]->id, array_column($keynotes, 'id'))) {
        $existingKeynoteImage = explode('storage/', $existingKeynotes[$i]->img_path);
        if (!$existingKeynoteImage) {
          continue;
        };
        $existingKeynoteImage = $existingKeynoteImage[1];
        Storage::disk('public')->delete($existingKeynoteImage);
        $existingKeynotes[$i]->delete();
      }
    }

    DB::transaction(function () use ($keynotes, $existingKeynotes) {
      foreach ($keynotes as $keynote) {
        $newImg = '';
        if (!empty($keynote['input_img'])) {
          $inputImg = $keynote['input_img'];
          $inputImgName =
            md5($inputImg->getClientOriginalName() . random_bytes(4)) . '.' . $inputImg->getClientOriginalExtension();
          $inputImgPath = 'home/keynote/' . $inputImgName;
          Storage::disk('public')->put($inputImgPath, $inputImg->getContent());
          // $keynote['img_path'] = $inputImgPath;
          $newImg = $inputImgPath;
        }

        if (in_array($keynote['id'], $existingKeynotes->pluck('id')->toArray())) {
          if ($newImg) {
            $existingKeynoteImage = explode('storage/', $keynote['img_path']);
            $existingKeynoteImage = $existingKeynoteImage[1];
            Storage::disk('public')->delete($existingKeynoteImage);
          }

          HomeKeynoteContent::where('id', $keynote['id'])->update([
            'title' => $keynote['title'],
            'name' => $keynote['name'],
            'affiliation' => $keynote['affiliation'],
            'rank' => $keynote['rank'],
            'img_path' =>
              $newImg != ''
                ? url('/') . '/' . 'storage/' . $newImg
                : $keynote['img_path'],
          ]);
          continue;
        }

        HomeKeynoteContent::create([
          'title' => $keynote['title'],
          'name' => $keynote['name'],
          'affiliation' => $keynote['affiliation'],
          'rank' => $keynote['rank'],
          'img_path' => $newImg ? url('/') . '/' . 'storage/' . $newImg : null,
        ]);
      }
    });

    return redirect()->route('home.keynote.show');
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
  public function update(
    Request $request,
    HomeKeynoteContent $homeKeynoteContent
  ) {
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
