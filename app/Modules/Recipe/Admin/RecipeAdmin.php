<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 31/08/16
 * Time: 21:30
 */

namespace Modules\Recipe\Admin;

use Modules\Admin\Admin\Admin;
use Modules\Recipe\Models\Recipe;

class RecipeAdmin extends Admin
{
    /**
     * @return string model class name
     */
    public function getModelClass()
    {
        return Recipe::class;
    }
}