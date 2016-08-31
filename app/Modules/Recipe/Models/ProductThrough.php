<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 31/08/16
 * Time: 21:28
 */

namespace Modules\Recipe\Models;

use Mindy\Orm\Fields\ForeignField;
use Mindy\Orm\Fields\IntField;
use Mindy\Orm\Fields\TextField;
use Mindy\Orm\Model;

class ProductThrough extends Model
{
    const TYPE_UNIT = 1;

    public static function getFields()
    {
        return [
            'product' => [
                'class' => ForeignField::class,
                'modelClass' => Product::class,
                'verboseName' => self::t('Product')
            ],
            'recipe' => [
                'class' => ForeignField::class,
                'modelClass' => Recipe::class,
                'verboseName' => self::t('Recipe')
            ],
            'description' => [
                'class' => TextField::class,
                'verboseName' => self::t('Description')
            ],
            'count' => [
                'class' => IntField::class,
                'verboseName' => self::t('Count'),
                'default' => 0
            ],
            'type' => [
                'class' => IntField::class,
                'verboseName' => self::t('Type'),
                'default' => self::TYPE_UNIT,
                'choices' => [
                    self::TYPE_UNIT => 'Шт.'
                ]
            ]
        ];
    }
}