<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomeHeaderContent extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $fillable = [
        "background_image_path",
        "date_stamp",
        "logo_path",
        "title",
        "subtitle"
    ];
}
