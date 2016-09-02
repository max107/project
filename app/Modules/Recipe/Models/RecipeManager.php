<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 02/09/16
 * Time: 13:39
 */

namespace Modules\Recipe\Models;

use Mindy\Orm\Manager;

class RecipeManager extends Manager
{
    public function published()
    {
        $this->filter(['is_published' => true]);
        return $this;
    }
}