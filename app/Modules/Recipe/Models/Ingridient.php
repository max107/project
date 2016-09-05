<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 05/09/16
 * Time: 14:07
 */

namespace Modules\Recipe\Models;

use Mindy\Orm\Fields\CharField;
use Mindy\Orm\Fields\ForeignField;
use Mindy\Orm\Model;

class Ingridient extends Model
{
    public static function getFields()
    {
        return [
            'recipe' => [
                'class' => ForeignField::class,
                'modelClass' => Recipe::class,
                'verboseName' => self::t('Recipe'),
                'editable' => false,
            ],
            'name' => [
                'class' => CharField::class,
                'verboseName' => self::t('Name')
            ],
            'count' => [
                'class' => CharField::class,
                'verboseName' => self::t('Count')
            ],
        ];
    }
}