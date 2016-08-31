<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 31/08/16
 * Time: 21:24
 */

namespace Modules\Recipe\Models;

use Mindy\Orm\Fields\CharField;
use Mindy\Orm\Fields\ManyToManyField;
use Mindy\Orm\Fields\TextField;
use Mindy\Orm\Model;

class Recipe extends Model
{
    public static function getFields()
    {
        return [
            'name' => [
                'class' => CharField::class,
                'verboseName' => self::t('Name')
            ],
            'categories' => [
                'class' => ManyToManyField::class,
                'modelClass' => Category::class,
                'verboseName' => self::t('Category')
            ],
            'description' => [
                'class' => TextField::class,
                'verboseName' => self::t('Description')
            ],
            'description_short' => [
                'class' => TextField::class,
                'verboseName' => self::t('Description short')
            ],
            'products' => [
                'class' => ManyToManyField::class,
                'through' => ProductThrough::class,
                'throughLink' => ['recipe_id', 'product_id'],
                'modelClass' => Product::class,
                'verboseName' => self::t('Product')
            ]
        ];
    }
}