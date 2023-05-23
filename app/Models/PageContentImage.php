<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageContentImage extends Model
{
    use HasFactory;

    protected $fillable = [
        "page_content_id",
        "path"
    ];

    public function pageContent() {
        return $this->belongsTo(PageContent::class);
    }
}
