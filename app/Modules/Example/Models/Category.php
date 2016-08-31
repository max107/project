<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 28/08/16
 * Time: 14:40
 */

namespace Modules\Example\Models;

use Mindy\Orm\Fields\CharField;
use Mindy\Orm\Model;

class Category extends Model
{
    public static function getFields()
    {
        return [
            'name' => [
                'class' => CharField::class
            ]
        ];
    }
}