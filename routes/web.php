<?php

use App\Actions\Fortify\UserProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProgramCommitteController;
use App\Http\Controllers\PublicationOpportunityController;
use App\Http\Controllers\ScientificReviewController;
use App\Http\Controllers\SubmissionGuidlineController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/publication-opportunity', [PublicationOpportunityController::class, 'index'])->name('pub.home');
Route::get('/publication-opportunity/create', [PublicationOpportunityController::class, 'createPage'])->name("pub.create");
Route::post('/publication-opportunity/create', [PublicationOpportunityController::class, 'store'])->name("pub.post");
Route::get('/publication-opportunity/{id}', [PublicationOpportunityController::class, 'editPage'])->name("pub.edit");
Route::put('/publication-opportunity/{id}', [PublicationOpportunityController::class, 'update'])->name("pub.put");

Route::get('/program-committe', [ProgramCommitteController::class, 'index'])->name("proc.home");
Route::get('/program-committe/create', [ProgramCommitteController::class, 'createPage'])->name("proc.create");
Route::post('/program-committe/create', [ProgramCommitteController::class, 'store'])->name("proc.post");
Route::get('/program-committe/{id}', [ProgramCommitteController::class, 'editPage'])->name("proc.edit");
Route::put('/program-committe/{id}', [ProgramCommitteController::class, 'update'])->name("proc.put");
Route::put('/program-committe/{id}/toggle_active', [ProgramCommitteController::class, 'toggleActive'])->name("proc.toggle_active");

Route::get('/scientific-review', [ScientificReviewController::class, 'index'])->name("sci-rev.home");
Route::get('/scientific-review/create', [ScientificReviewController::class, 'createPage'] )->name("sci-rev.create");
Route::post('/scientific-review/create', [ScientificReviewController::class, 'store'] )->name("sci-rev.post");
Route::get('/scientific-review/{id}', [ScientificReviewController::class, 'editpage'] )->name("sci-rev.edit");
Route::put('/scientific-review/{id}', [ScientificReviewController::class, 'update'] )->name("sci-rev.edit");

Route::get('/submission-guideline', [SubmissionGuidlineController::class, 'index'])->name("sub.home");
Route::get('/submission-guideline/create', [SubmissionGuidlineController::class, 'createPage'])->name("sub.create");
Route::post('/submission-guideline/create', [SubmissionGuidlineController::class, 'store'])->name("sub.post");
Route::get('/submission-guideline/{id}', [SubmissionGuidlineController::class, 'editPage'])->name("sub.edit");
Route::put('/submission-guideline/{id}', [SubmissionGuidlineController::class, 'update'])->name("sub.edit");


Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/user/profile', [UserProfileController::class, 'show'])->name('profile.show');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::middleware(['role:admin|super-admin'])->group(function () {
        Route::middleware(['role:super-admin'])->group(function () {
            Route::resource('/user', UserController::class);
        });
    });
});
