<?php

use App\Actions\Fortify\UserProfileController;
use App\Http\Controllers\DashboardController;
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

Route::get('/', function () {
    return Inertia::render('HomeIndex', ["active" => "home"]);
});

// Route::get('/home', [PublicationOpportunityController::class, "home"])->name("home");
Route::get('/program-committe', [ProgramCommitteController::class, "home"])->name("proc.index");
Route::get('/publication-opportunity', [PublicationOpportunityController::class, "home"])->name("pub.index");
Route::get('/scientific-review', [ScientificReviewController::class, "home"])->name("sci-rev.index");
Route::get('/submission-guideline', [SubmissionGuidelineController::class, "home"])->name("sub.index");

Route::prefix('dashboard')->group(function () {
    Route::get('/', function () {
        return Inertia::render("Admin/Dashboard");
    })->name("dashboard.index");

    Route::get('/publication-opportunity', [PublicationOpportunityController::class, 'index'])->name('pub.home');
    Route::get('/publication-opportunity/create', [PublicationOpportunityController::class, 'createPage'])->name("pub.create");
    Route::post('/publication-opportunity/create', [PublicationOpportunityController::class, 'store'])->name("pub.post");
    Route::get('/publication-opportunity/{id}', [PublicationOpportunityController::class, 'editPage'])->name("pub.edit");
    Route::put('/publication-opportunity/{id}', [PublicationOpportunityController::class, 'update'])->name("pub.put");
    Route::delete('/publication-opportunity/{id}', [PublicationOpportunityController::class, 'destroy'])->name("pub.delete");
    Route::put('/publication-opportunity/{id}/toggle_active', [PublicationOpportunityController::class, 'toggleActive'])->name("pub.toggle_active");
    
    Route::get('/program-committe', [ProgramCommitteController::class, 'index'])->name("proc.home");
    Route::get('/program-committe/create', [ProgramCommitteController::class, 'createPage'])->name("proc.create");
    Route::post('/program-committe/create', [ProgramCommitteController::class, 'store'])->name("proc.post");
    Route::get('/program-committe/{id}', [ProgramCommitteController::class, 'editPage'])->name("proc.edit");
    Route::put('/program-committe/{id}', [ProgramCommitteController::class, 'update'])->name("proc.put");
    Route::delete('/program-committe/{id}', [ProgramCommitteController::class, 'destroy'])->name("proc.delete");
    Route::put('/program-committe/{id}/toggle_active', [ProgramCommitteController::class, 'toggleActive'])->name("proc.toggle_active");
    
    Route::get('/scientific-review', [ScientificReviewController::class, 'index'])->name("sci-rev.home");
    Route::get('/scientific-review/create', [ScientificReviewController::class, 'createPage'] )->name("sci-rev.create");
    Route::post('/scientific-review/create', [ScientificReviewController::class, 'store'] )->name("sci-rev.post");
    Route::get('/scientific-review/{id}', [ScientificReviewController::class, 'editpage'] )->name("sci-rev.edit");
    Route::put('/scientific-review/{id}', [ScientificReviewController::class, 'update'] )->name("sci-rev.put");
    Route::delete('/scientific-review/{id}', [ScientificReviewController::class, 'destroy'])->name("sci-rev.delete");
    Route::put('/scientific-review/{id}/toggle_active', [ScientificReviewController::class, 'toggleActive'])->name("sci-rev.toggle_active");
    
    Route::get('/submission-guideline', [SubmissionGuidelineController::class, 'index'])->name("sub.home");
    Route::get('/submission-guideline/create', [SubmissionGuidelineController::class, 'createPage'])->name("sub.create");
    Route::post('/submission-guideline/create', [SubmissionGuidelineController::class, 'store'])->name("sub.post");
    Route::get('/submission-guideline/{id}', [SubmissionGuidelineController::class, 'editPage'])->name("sub.edit");
    Route::put('/submission-guideline/{id}', [SubmissionGuidelineController::class, 'update'])->name("sub.put");
    Route::delete('/submission-guideline/{id}', [SubmissionGuidelineController::class, 'destroy'])->name("sub.delete");
    Route::put('/submission-guideline/{id}/toggle_active', [SubmissionGuidelineController::class, 'toggleActive'])->name("sub.toggle_active");
});



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
});
