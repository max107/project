<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 05/09/16
 * Time: 14:08
 */

namespace Modules\Recipe\Models;

use Mindy\Orm\Fields\ForeignField;
use Mindy\Orm\Fields\ImageField;
use Mindy\Orm\Fields\TextField;
use Mindy\Orm\Model;

class Instruction extends Model
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
            'text' => [
                'class' => TextField::class,
                'verboseName' => self::t('Text')
            ],
            'image' => [
                'class' => ImageField::class,
                'verboseName' => self::t('Image')
            ],
        ];
    }
}