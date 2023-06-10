<?php

namespace App\Http\Controllers;

use App\Models\HomeGalleryContent;
use App\Models\HomeHeaderContent;
use App\Models\HomeKeynoteContent;
use App\Models\HomeNewsContent;
use App\Models\HomePublicationContent;
use App\Models\HomeSupportedByContent;
use App\Models\HomeTimelineContent;
use Inertia\Inertia;

class MainHomeContentController extends Controller
{
    public function index() {
        $header = HomeHeaderContent::all()->first();
        $news = HomeNewsContent::where('is_active', true)->first();
        $keynotes = HomeKeynoteContent::all();
        $galleries = HomeGalleryContent::all();
        $timelines = HomeTimelineContent::all();
        $publications = HomePublicationContent::all();
        $supportedBy = HomeSupportedByContent::all();

        return Inertia::render('HomeIndex', [
            "header" => $header ? $header : json_encode([
              'date_stamp' => '',
              'logo_path' => '',
              'background_image_path' => '',
              'title' => '',
              'subtitle' => '',
            ]),
            "news" => $news ?? [
                "title" => "No News",
                "content" => "",
                "image" => "",
                "is_active" => "",
                "link_to" => ""
            ],
            "keynotes" => $keynotes ? $keynotes : [],
            "galleries" => $galleries ? $galleries : [],
            "timelines" => $timelines  ? $timelines : [],
            "publications" => $publications ? $publications : [],
            "supportedBy" => $supportedBy ? $supportedBy : [],
            "active" => "home"
        ]);
    }
}
