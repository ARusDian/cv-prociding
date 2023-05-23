<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ScientificReviewController extends Controller
{
    public function index() {
      return Inertia::render('Admin/ScientificReview/Index');
    }
  
    public function createPage() {
      return Inertia::render('Admin/ScientificReview/Create');
    }
  
    public function store(Request $request) {
      dd($request->all());
    }
  
    public function editPage(string $id) {
      return Inertia::render('Admin/ScientificReview/Edit', ['id' => $id]);
    }
  
    public function update(Request $request, string $id) {
      dd($request->all(), $id);
    }
}