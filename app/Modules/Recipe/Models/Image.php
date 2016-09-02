<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 02/09/16
 * Time: 14:03
 */

namespace Modules\Recipe\Models;

use Mindy\Orm\Fields\ImageField;
use Mindy\Orm\Model;

class Image extends Model
{
    public static function getFields()
    {
        return [
            'image' => [
                'class' => ImageField::class,
                'verboseName' => self::t('Image'),
                'sizes' => [
                    'thumb' => [300, 200, 'method' => 'adaptiveResize']
                ]
            ]
        ];
    }

    public function __toString()
    {
        return (string)$this->id;
    }
}