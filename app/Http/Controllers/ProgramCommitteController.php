<?php

namespace App\Http\Controllers;

use App\Models\PageContent;
use App\Models\PageContentImage;
use App\Models\ProgramCommitte;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProgramCommitteController extends Controller
{
    //
  public function index() {
    $contents = PageContent::where("type", "programCommitte")->get();

    return Inertia::render('Admin/ProgramCommitte/Index', [
      "contents" => $contents
    ]);
  }

  public function createPage() {
    return Inertia::render('Admin/ProgramCommitte/Create');
  }

  public function store(Request $request) {
    $images = $request->images ?? [];
    $availableImages = [];
    $editorContent = $request->editorContent;

    foreach($images as $image) {
      if (str_contains($editorContent, $image)) {
        array_push($availableImages, $image);
      }
    }
    
    $submittedImagesPath = [];
    foreach($availableImages as $image) {
      $newImage = str_replace('"', '', $image);
      $newImage = str_replace('data:image/png;base64,', '', $newImage);
      $newImage = str_replace(' ', '+', $newImage);
      $imageName = md5(rand(1, 10)).'.png';
      Storage::disk('public')->put('program_committe/'.$imageName, base64_decode($newImage));
      $editorContent = str_replace($image, url('/')."/storage/program_committe/".$imageName , $editorContent);
      // $editorContent = str_replace('src="'.$image.'"', "src={asset('public','program_committe/".$imageName."')}", $editorContent);
      array_push($submittedImagesPath, 'program_committe/'.$imageName);
    }
    $newProgramCommitte = PageContent::create([
      'content' => $editorContent,
      'type' => "programCommitte"
    ]);

    forEach($submittedImagesPath as $imagePath) {
      PageContentImage::create([
        'page_content_id' => $newProgramCommitte->id,
        'path' => $imagePath
      ]);
    }

    return redirect()->route('proc.home');
  }

  public function editPage(string $id) {
    $programCommitte = PageContent::where('id', $id)->where('type', 'programCommitte')->first();
    // dd($programCommitte);
    return Inertia::render('Admin/ProgramCommitte/Edit', ["id" => $id, "programCommitte" => $programCommitte]);
  }

  public function toggleActive(string $id) {
    $activedContent = PageContent::where('is_active', 1)->where('type', 'programCommitte')->first();
    $toBeActiveProgramCommitte = PageContent::where('id', $id)->where('type', 'programCommitte')->first();

    if ($activedContent && ($activedContent->id == $toBeActiveProgramCommitte->id)) {
      $activedContent->is_active = false;
      $activedContent->save();
      return redirect()->back();
    }

    $is_active = $toBeActiveProgramCommitte->is_active;
    $toBeActiveProgramCommitte->is_active = !$is_active;
    $toBeActiveProgramCommitte->save();
    if ($activedContent) {
      $activedContent->is_active = false;
      $activedContent->save();
    }

    return redirect()->back();
  }
  
  public function update(Request $request, string $id) {
    dd($request->all(), $id);
  }
}
