<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 05/09/16
 * Time: 17:00
 */

namespace Modules\Recipe\Models;

use function Mindy\app;
use Mindy\Orm\Fields\ForeignField;
use Mindy\Orm\Fields\ManyToManyField;
use Mindy\Orm\Model;

class ShoppingList extends Model
{
    public static function getFields()
    {
        return [
            'user' => [
                'class' => ForeignField::class,
                'modelClass' => app()->auth->userClass,
                'verboseName' => self::t('User')
            ],
            'products' => [
                'class' => ManyToManyField::class,
                'modelClass' => Product::class,
                'through' => ShoppingListThrough::class,
                'throughLink' => ['shopping_list_id', 'product_id'],
                'verboseName' => self::t('Products')
            ]
        ];
    }
}