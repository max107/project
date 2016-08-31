<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 31/08/16
 * Time: 21:30
 */

namespace Modules\Recipe\Admin;

use Modules\Admin\Admin\Admin;

class ProductAdmin extends Admin
{
    /**
     * @return string model class name
     */
    public function getModelClass()
    {
        return ProductAdmin::class;
    }
}