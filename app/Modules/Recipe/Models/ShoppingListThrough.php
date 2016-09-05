<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 05/09/16
 * Time: 17:02
 */

namespace Modules\Recipe\Models;

use Mindy\Orm\Fields\ForeignField;
use Mindy\Orm\Fields\IntField;
use Mindy\Orm\Model;

class ShoppingListThrough extends Model
{
    const TYPE_UNIT = 1;
    const TYPE_WEIGHT = 2;
    const TYPE_FLUID = 2;

    public static function getFields()
    {
        return [
            'product' => [
                'class' => ForeignField::class,
                'modelClass' => Product::class,
                'verboseName' => self::t('Product')
            ],
            'shopping_list' => [
                'class' => ForeignField::class,
                'modelClass' => ShoppingList::class,
                'verboseName' => self::t('Shopping list')
            ],
            'count' => [
                'class' => IntField::class,
                'verboseName' => self::t('Count')
            ],
            'type' => [
                'class' => IntField::class,
                'verboseName' => self::t('Type'),
                'choices' => [
                    self::TYPE_UNIT => 'шт.',
                    self::TYPE_WEIGHT => 'гр.',
                    self::TYPE_FLUID => 'мл.'
                ]
            ]
        ];
    }
}