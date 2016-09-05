<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 05/09/16
 * Time: 16:21
 */

namespace Modules\Recipe\Models;

use Mindy\Orm\Fields\CharField;
use Mindy\Orm\Model;

class ProductCategory extends Model
{
    public static function getFields()
    {
        return [
            'name' => [
                'class' => CharField::class,
                'verboseName' => self::t('Name')
            ],
        ];
    }

    public function __toString()
    {
        return (string)$this->name;
    }
}