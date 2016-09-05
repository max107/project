<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 31/08/16
 * Time: 21:26
 */

namespace Modules\Recipe\Models;

use Mindy\Orm\Fields\CharField;
use Mindy\Orm\Fields\SlugField;
use Mindy\Orm\TreeModel;

class Category extends TreeModel
{
    public static function getFields()
    {
        return array_merge(parent::getFields(), [
            'name' => [
                'class' => CharField::class,
                'verboseName' => self::t('Name')
            ],
            'slug' => [
                'class' => SlugField::class,
                'verboseName' => self::t('Slug')
            ]
        ]);
    }

    public function __toString()
    {
        return (string)$this->name;
    }

    public function getAbsoluteUrl()
    {
        return $this->reverse('recipe:list', ['slug' => $this->slug]);
    }
}