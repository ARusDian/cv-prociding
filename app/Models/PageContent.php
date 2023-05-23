<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
        'type'
    ];

    public function pageContentImages() {
        return $this->hasMany(PageContentImage::class);
    }
}
