<?php

namespace App\Http\Controllers;

use App\Models\HomeNewsContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeNewsContentController extends Controller
{
    public function show()
    {
        $news = HomeNewsContent::all();
        return Inertia::render('Admin/HomeContent/News', [
            'news' => $news ?? [],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'linkTo' => 'required',
            'img' => 'required|image|mimes:jpeg,png,jpg',
        ]);

        $img = $request->file('img');
        $imgName = md5($img->getClientOriginalName() . random_bytes(4)) . '.' . $img->getClientOriginalExtension();
        $imgPath = 'home/news/' . $imgName;
        Storage::disk('public')->put($imgPath, $img->getContent());

        HomeNewsContent::create([
            'title' => $request->title,
            'content' => $request->content,
            'link_to' => $request->linkTo,
            'image' => url('/') . '/' . 'storage/' . $imgPath,
        ]);

        return redirect()->route('home.news.show');
    }

    public function update(Request $request, HomeNewsContent $news)
    {
        $currentImgPath = '';
        $imgPath = '';
        if ($request->img) {
            $currentImgPath = explode('storage/', $news->image);
            $currentImgPath = $currentImgPath[1];
            Storage::disk('public')->delete($currentImgPath);

            $img = $request->file('img');
            $imgName = md5($img->getClientOriginalName() . random_bytes(4)) . '.' . $img->getClientOriginalExtension();
            $imgPath = 'home/news/' . $imgName;
            Storage::disk('public')->put($imgPath, $img->getContent());
        }

        if ($request->title) {
            $news->title = $request->title;
        }
        if ($request->content) {
            $news->content = $request->content;
        }
        if ($request->link_to) {
            $news->link_to = $request->link_to;
        }
        if ($imgPath) {
            $news->image = url('/') . '/' . 'storage/' . $imgPath;
        }
        $news->save();

        return redirect()->route('home.news.show');
    }

    public function destroy(HomeNewsContent $news)
    {
        $currentImgPath = explode('storage/', $news->image);
        $currentImgPath = $currentImgPath[1];
        Storage::disk('public')->delete($currentImgPath);

        $news->delete();
        return redirect()->route('home.news.show');
    }

    public function toggleActive(HomeNewsContent $news){
        $allNews = HomeNewsContent::all()->except($news->id);
        foreach ($allNews as $item){
            $item->is_active = false;
            $item->save();
        }

        $news->is_active = !$news->is_active;
        $news->save();
        return redirect()->route('home.news.show');
    }
}
