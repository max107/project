<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 05/09/16
 * Time: 16:04
 */

namespace Modules\Recipe\Models;

use Mindy\Orm\Fields\CharField;
use Mindy\Orm\Fields\ForeignField;
use Mindy\Orm\Fields\TextField;
use Mindy\Orm\Model;

class Product extends Model
{
    public static function getFields()
    {
        return [
            'name' => [
                'class' => CharField::class,
                'verboseName' => self::t('Name')
            ],
            'description' => [
                'class' => TextField::class,
                'verboseName' => self::t('Description')
            ],
            'category' => [
                'class' => ForeignField::class,
                'modelClass' => ProductCategory::class,
                'verboseName' => self::t('Category')
            ]
        ];
    }

    public function __toString()
    {
        return (string)$this->name;
    }
}