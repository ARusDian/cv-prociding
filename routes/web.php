<?php

use App\Actions\Fortify\UserProfileController;
use App\Http\Controllers\HomeGalleryContentController;
use App\Http\Controllers\HomeHeaderContentController;
use App\Http\Controllers\HomeKeynoteContentController;
use App\Http\Controllers\HomeNewsContentController;
use App\Http\Controllers\HomePublicationContentController;
use App\Http\Controllers\HomeSupportedByContentController;
use App\Http\Controllers\HomeTimelineContentController;
use App\Http\Controllers\MainHomeContentController;
use App\Http\Controllers\ProgramCommitteController;
use App\Http\Controllers\PublicationOpportunityController;
use App\Http\Controllers\ScientificReviewController;
use App\Http\Controllers\SubmissionGuidelineController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [MainHomeContentController::class, "index"])->name("home");

// Route::get('/home', [PublicationOpportunityController::class, "home"])->name("home");
Route::get('/program-committe', [ProgramCommitteController::class, "home"])->name("proc.index");
Route::get('/publication-opportunity', [PublicationOpportunityController::class, "home"])->name("pub.index");
Route::get('/scientific-review', [ScientificReviewController::class, "home"])->name("sci-rev.index");
Route::get('/submission-guideline', [SubmissionGuidelineController::class, "home"])->name("sub.index");



Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
    ])->group(function () {
        Route::get('/user/profile', [UserProfileController::class, 'show'])->name('profile.show');
        Route::middleware(['role:admin|super-admin'])->group(function () {
            Route::middleware(['role:super-admin'])->group(function () {
                Route::resource('/user', UserController::class);
        });
    });


    Route::prefix('dashboard')->group(function () {
        Route::get('/', function () {
            return Inertia::render("Admin/Dashboard");
        })->name("dashboard");
    
        Route::get('/home/header', [HomeHeaderContentController::class, 'show'])->name("home.header.show");
        Route::post("/home/header/create", [HomeHeaderContentController::class, "store"])->name("home.header.store");
        Route::put("/home/header/{homeHeader}", [HomeHeaderContentController::class, "update"])->name("home.header.update");
    
        Route::get('/home/news', [HomeNewsContentController::class, 'show'])->name("home.news.show");
        Route::post("/home/news/create", [HomeNewsContentController::class, "store"])->name("home.news.store");
        Route::put("/home/news/{news}", [HomeNewsContentController::class, "update"])->name("home.news.update");
        Route::delete("/home/news/{news}", [HomeNewsContentController::class, "destroy"])->name("home.news.destroy");
        Route::put("/home/news/{news}/toggle-active", [HomeNewsContentController::class, "toggleActive"])->name("home.news.toggle_active");
    
        Route::get('/home/keynote', [HomeKeynoteContentController::class, 'show'])->name("home.keynote.show");
        Route::post("/home/keynote/create", [HomeKeynoteContentController::class, "store"])->name("home.keynote.store");
        Route::put("/home/keynote/{homeHeader}", [HomeKeynoteContentController::class, "update"])->name("home.keynote.update");
    
        Route::get('/home/gallery', [HomeGalleryContentController::class, 'show'])->name("home.gallery.show");
        Route::post("/home/gallery/create", [HomeGalleryContentController::class, "store"])->name("home.gallery.store");
        Route::put("/home/gallery/{gallery}", [HomeGalleryContentController::class, "update"])->name("home.gallery.update");
        Route::delete("/home/gallery/{gallery}", [HomeGalleryContentController::class, "destroy"])->name("home.gallery.destroy");
    
        Route::get('/home/timeline', [HomeTimelineContentController::class, 'show'])->name("home.timeline.show");
        Route::post("/home/timeline/create", [HomeTimelineContentController::class, "store"])->name("home.timeline.store");
        Route::put("/home/timeline/{timeline}", [HomeTimelineContentController::class, "update"])->name("home.timeline.update");
        Route::delete("/home/timeline/{timeline}", [HomeTimelineContentController::class, "destroy"])->name("home.timeline.destroy");
    
        Route::get('/home/publication', [HomePublicationContentController::class, 'show'])->name("home.publication.show");
        Route::post("/home/publication/create", [HomePublicationContentController::class, "store"])->name("home.publication.store");
        Route::put("/home/publication/{publication}", [HomePublicationContentController::class, "update"])->name("home.publication.update");
        Route::delete("/home/publication/{publication}", [HomePublicationContentController::class, "destroy"])->name("home.publication.destroy");
    
        Route::get('/home/support', [HomeSupportedByContentController::class, 'show'])->name("home.support.show");
        Route::post("/home/support/create", [HomeSupportedByContentController::class, "store"])->name("home.support.store");
        Route::put("/home/support/{support}", [HomeSupportedByContentController::class, "update"])->name("home.support.update");
        Route::delete("/home/support/{support}", [HomeSupportedByContentController::class, "destroy"])->name("home.support.destroy");
    
        Route::get('/publication-opportunity', [PublicationOpportunityController::class, 'index'])->name('pub.home');
        Route::get('/publication-opportunity/create', [PublicationOpportunityController::class, 'createPage'])->name("pub.create");
        Route::post('/publication-opportunity/create', [PublicationOpportunityController::class, 'store'])->name("pub.store");
        Route::get('/publication-opportunity/{id}', [PublicationOpportunityController::class, 'editPage'])->name("pub.edit");
        Route::put('/publication-opportunity/{id}', [PublicationOpportunityController::class, 'update'])->name("pub.update");
        Route::delete('/publication-opportunity/{id}', [PublicationOpportunityController::class, 'destroy'])->name("pub.destroy");
        Route::put('/publication-opportunity/{id}/toggle_active', [PublicationOpportunityController::class, 'toggleActive'])->name("pub.toggle_active");
        
        Route::get('/program-committe', [ProgramCommitteController::class, 'index'])->name("proc.home");
        Route::get('/program-committe/create', [ProgramCommitteController::class, 'createPage'])->name("proc.create");
        Route::post('/program-committe/create', [ProgramCommitteController::class, 'store'])->name("proc.store");
        Route::get('/program-committe/{id}', [ProgramCommitteController::class, 'editPage'])->name("proc.edit");
        Route::put('/program-committe/{id}', [ProgramCommitteController::class, 'update'])->name("proc.put");
        Route::delete('/program-committe/{id}', [ProgramCommitteController::class, 'destroy'])->name("proc.destroy");
        Route::put('/program-committe/{id}/toggle_active', [ProgramCommitteController::class, 'toggleActive'])->name("proc.toggle_active");
        
        Route::get('/scientific-review', [ScientificReviewController::class, 'index'])->name("sci-rev.home");
        Route::get('/scientific-review/create', [ScientificReviewController::class, 'createPage'] )->name("sci-rev.create");
        Route::post('/scientific-review/create', [ScientificReviewController::class, 'store'] )->name("sci-rev.store");
        Route::get('/scientific-review/{id}', [ScientificReviewController::class, 'editpage'] )->name("sci-rev.edit");
        Route::put('/scientific-review/{id}', [ScientificReviewController::class, 'update'] )->name("sci-rev.update");
        Route::delete('/scientific-review/{id}', [ScientificReviewController::class, 'destroy'])->name("sci-rev.destroy");
        Route::put('/scientific-review/{id}/toggle_active', [ScientificReviewController::class, 'toggleActive'])->name("sci-rev.toggle_active");
        
        Route::get('/submission-guideline', [SubmissionGuidelineController::class, 'index'])->name("sub.home");
        Route::get('/submission-guideline/create', [SubmissionGuidelineController::class, 'createPage'])->name("sub.create");
        Route::post('/submission-guideline/create', [SubmissionGuidelineController::class, 'store'])->name("sub.store");
        Route::get('/submission-guideline/{id}', [SubmissionGuidelineController::class, 'editPage'])->name("sub.edit");
        Route::put('/submission-guideline/{id}', [SubmissionGuidelineController::class, 'update'])->name("sub.update");
        Route::delete('/submission-guideline/{id}', [SubmissionGuidelineController::class, 'destroy'])->name("sub.destroy");
        Route::put('/submission-guideline/{id}/toggle_active', [SubmissionGuidelineController::class, 'toggleActive'])->name("sub.toggle_active");
    });
});
