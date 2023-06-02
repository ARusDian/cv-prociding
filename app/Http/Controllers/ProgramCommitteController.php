<?php

namespace App\Http\Controllers;

use App\Models\PageContent;
use App\Models\PageContentImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProgramCommitteController extends Controller
{
  public function home() {
    $content = PageContent::where("is_active", "1")->where("type", "programCommitte")->first();
    return Inertia::render('Home', [
      "content" => $content,
      "active" => "proc"
    ]);
  }
    //
  public function index() {
    $contents = PageContent::latest()->where("type", "programCommitte")->get();

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
      $newImage = preg_replace('/^data:image\/(png|jpeg|jpg);base64,/', '', $newImage);;
      $newImage = str_replace(' ', '+', $newImage);
      $imageName = md5(rand(1, 10) . random_bytes(4)).'.png';
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
    } else {
      $is_active = $toBeActiveProgramCommitte->is_active;
      $toBeActiveProgramCommitte->is_active = !$is_active;
      $toBeActiveProgramCommitte->save();
      if ($activedContent) {
        $activedContent->is_active = false;
        $activedContent->save();
      }
    }
    // return response()->json([
    //   "message" => "Berhasil mengupdate status!"
    // ], 200);
    return redirect()->route('proc.home');
  }
  
  public function update(Request $request, PageContent $id) {
    $pageContent = $id;
    $images = $request->images;
    $editorContent = $request->editorContent;
    $availableImages = [];
    $pageContentImages = PageContentImage::where('page_content_id', $pageContent->id)->get();

    return DB::transaction(function () use ($pageContent, $images, $editorContent, $availableImages, $pageContentImages) {

      foreach($images as $image) {
        if (str_contains($editorContent, $image)) {
          array_push($availableImages, $image);
        }
      }
  
      $submittedImagesPath = [];
      foreach($availableImages as $image) {
        $newImage = str_replace('"', '', $image);
        $newImage = preg_replace('/^data:image\/(png|jpeg|jpg);base64,/', '', $newImage);;
        $newImage = str_replace(' ', '+', $newImage);
        $imageName = md5(rand(1, 10) . random_bytes(4)).'.png';
        Storage::disk('public')->put('program_committe/'.$imageName, base64_decode($newImage));
        $editorContent = str_replace($image, url('/')."/storage/program_committe/".$imageName , $editorContent);
        array_push($submittedImagesPath, 'program_committe/'.$imageName);
      }
  
      forEach($submittedImagesPath as $imagePath) {
        PageContentImage::create([
          'page_content_id' => $pageContent->id,
          'path' => $imagePath
        ]);
      }
  
      $pageContent->content = $editorContent;
      $pageContent->save();
  
      forEach($pageContentImages as $pageContentImage) {
        if (!str_contains($pageContent->content, $pageContentImage->path)) {
          Storage::disk('public')->delete($pageContentImage->path);
          $pageContentImage->delete();
        }
      }
  
      return redirect()->route('proc.home');
    });
    
  }

  public function destroy($id) {
    $images = PageContentImage::where('page_content_id' , $id)->get();
    
    return DB::transaction(function () use ($images, $id){
      foreach($images as $image){
        Storage::disk('public')->delete($image->path);
        $image->delete();
      }

      PageContent::find($id)->delete();

      return redirect()->route('proc.home');
    });
  }
}
