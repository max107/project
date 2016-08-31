<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 31/08/16
 * Time: 21:29
 */

namespace Modules\Recipe\Admin;

use Modules\Admin\Admin\Admin;
use Modules\Recipe\Models\Category;

class CategoryAdmin extends Admin
{
    /**
     * @return string model class name
     */
    public function getModelClass()
    {
        return Category::class;
    }
}