<?php

namespace App\Http\Controllers;

use App\Models\PageContent;
use App\Models\PageContentImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ScientificReviewController extends Controller
{
  public function home() {
    $content = PageContent::where("is_active", "1")->where("type", "scientificReview")->first();
    return Inertia::render('Home', [
      "content" => $content,
      "active" => "sci-rev"
    ]);
  }

  public function index() {
    $contents = PageContent::latest()->where("type", "scientificReview")->get();

    return Inertia::render('Admin/ScientificReview/Index', [
      "contents" => $contents
    ]);
  }

  public function createPage() {
    return Inertia::render('Admin/ScientificReview/Create');
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
      Storage::disk('public')->put('scientific_review/'.$imageName, base64_decode($newImage));
      $editorContent = str_replace($image, url('/')."/storage/scientific_review/".$imageName , $editorContent);
      // $editorContent = str_replace('src="'.$image.'"', "src={asset('public','scientific_review/".$imageName."')}", $editorContent);
      array_push($submittedImagesPath, 'scientific_review/'.$imageName);
    }
    $newPublication = PageContent::create([
      'content' => $editorContent,
      'type' => "scientificReview"
    ]);

    forEach($submittedImagesPath as $imagePath) {
      PageContentImage::create([
        'page_content_id' => $newPublication->id,
        'path' => $imagePath
      ]);
    }

    return redirect()->route('sci-rev.home');
  }

  public function editPage(string $id) {
    $scientificReview = PageContent::where('id', $id)->where('type', 'scientificReview')->first();
    // dd($scientificReview);
    return Inertia::render('Admin/ScientificReview/Edit', ["id" => $id, "scientificReview" => $scientificReview]);
  }

  public function toggleActive(string $id) {
    $activedContent = PageContent::where('is_active', 1)->where('type', 'scientificReview')->first();
    $toBeActiveProgramCommitte = PageContent::where('id', $id)->where('type', 'scientificReview')->first();

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
    return redirect()->route('sci-rev.home');
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
        Storage::disk('public')->put('scientific_review/'.$imageName, base64_decode($newImage));
        $editorContent = str_replace($image, url('/')."/storage/scientific_review/".$imageName , $editorContent);
        array_push($submittedImagesPath, 'scientific_review/'.$imageName);
      }
  
      foreach($submittedImagesPath as $imagePath) {
        PageContentImage::create([
          'page_content_id' => $pageContent->id,
          'path' => $imagePath
        ]);
      }
  
      $pageContent->content = $editorContent;
      $pageContent->save();
  
      foreach($pageContentImages as $pageContentImage) {
        if (!str_contains($pageContent->content, $pageContentImage->path)) {
          Storage::disk('public')->delete($pageContentImage->path);
          $pageContentImage->delete();
        }
      }
  
      return redirect()->route('sci-rev.home');
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

      return redirect()->route('sci-rev.home');
    });
  }
}