<?php

namespace App\Http\Controllers;

use App\Models\HomeGalleryContent;
use App\Models\HomeHeaderContent;
use App\Models\HomeKeynoteContent;
use App\Models\HomePosterContent;
use App\Models\HomePublicationContent;
use App\Models\HomeSupportedByContent;
use Inertia\Inertia;

class MainHomeContentController extends Controller
{
    public function index() {
        $header = HomeHeaderContent::all()->first();
        $keynotes = HomeKeynoteContent::all();
        $galleries = HomeGalleryContent::all();
        $posters = HomePosterContent::all();
        $publications = HomePublicationContent::all();
        $supportedBy = HomeSupportedByContent::all();

        return Inertia::render('Admin/HomeContent/Index', [
            "header" => $header,
            "keynotes" => $keynotes,
            "galleries" => $galleries,
            "posters" => $posters,
            "publications" => $publications,
            "supportedBy" => $supportedBy,
            "active" => "home"
        ]);
    }
}
