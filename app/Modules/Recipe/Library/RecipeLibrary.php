<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 02/09/16
 * Time: 17:25
 */

namespace Modules\Recipe\Library;

use Mindy\Template\Library;
use Modules\Recipe\Models\Category;

class RecipeLibrary extends Library
{
    /**
     * @return array
     */
    public function getHelpers()
    {
        return [
            'get_recipe_categories' => function () {
                return Category::objects()->roots()->all();
            }
        ];
    }

    /**
     * @return array
     */
    public function getTags()
    {
        return [];
    }
}