<?php

namespace App\Http\Controllers;

use App\Models\HomeGalleryContent;
use App\Models\HomeHeaderContent;
use App\Models\HomeKeynoteContent;
use App\Models\HomePublicationContent;
use App\Models\HomeSupportedByContent;
use App\Models\HomeTimelineContent;
use Inertia\Inertia;

class MainHomeContentController extends Controller
{
    public function index() {
        $header = HomeHeaderContent::all()->first();
        $keynotes = HomeKeynoteContent::all();
        $galleries = HomeGalleryContent::all();
        $timelines = HomeTimelineContent::all();
        $publications = HomePublicationContent::all();
        $supportedBy = HomeSupportedByContent::all();

        return Inertia::render('HomeIndex', [
            "header" => $header,
            "keynotes" => $keynotes,
            "galleries" => $galleries,
            "timelines" => $timelines,
            "publications" => $publications,
            "supportedBy" => $supportedBy,
            "active" => "home"
        ]);
    }
}
