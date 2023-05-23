<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SubmissionGuidlineController extends Controller
{
    public function index() {
        return Inertia::render('Admin/SubmissionGuideline/Index');
    }

    public function createPage() {
        return Inertia::render('Admin/SubmissionGuideline/Create');
    }

    public function store(Request $request) {
        dd($request->all());
    }

    public function editPage(string $id) {
        return Inertia::render('Admin/SubmissionGuideline/Edit', ['id' => $id]);
    }

    public function update(Request $request, string $id) {
        dd($request->all(), $id);
    }
}
