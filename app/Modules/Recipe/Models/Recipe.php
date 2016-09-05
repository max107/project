<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 31/08/16
 * Time: 21:24
 */

namespace Modules\Recipe\Models;

use Mindy\Orm\Fields\BooleanField;
use Mindy\Orm\Fields\CharField;
use Mindy\Orm\Fields\DateTimeField;
use Mindy\Orm\Fields\HasManyField;
use Mindy\Orm\Fields\ImageField;
use Mindy\Orm\Fields\IntField;
use Mindy\Orm\Fields\ManyToManyField;
use Mindy\Orm\Fields\SlugField;
use Mindy\Orm\Fields\TextField;
use Mindy\Orm\Model;

/**
 * Class Recipe
 * @package Modules\Recipe\Models
 * @method static \Modules\Recipe\Models\RecipeManager objects($instance = null)
 */
class Recipe extends Model
{
    public static function getFields()
    {
        return [
            'name' => [
                'class' => CharField::class,
                'verboseName' => self::t('Name')
            ],
            'slug' => [
                'class' => SlugField::class,
                'verboseName' => self::t('Slug')
            ],
            'image' => [
                'class' => ImageField::class,
                'verboseName' => self::t('Image'),
                'sizes' => [
                    'thumb' => [340, 260, 'method' => 'adaptiveResize'],
                    'resize' => [800, 600, 'method' => 'adaptiveResize']
                ]
            ],
            'categories' => [
                'class' => ManyToManyField::class,
                'modelClass' => Category::class,
                'verboseName' => self::t('Category')
            ],
            'hours' => [
                'class' => IntField::class,
                'default' => 0,
                'verboseName' => self::t('Hours')
            ],
            'minutes' => [
                'class' => IntField::class,
                'default' => 0,
                'verboseName' => self::t('Minutes')
            ],
            'instructions' => [
                'class' => HasManyField::class,
                'modelClass' => Instruction::class,
                'verboseName' => self::t('Instructions')
            ],
            'ingridients' => [
                'class' => HasManyField::class,
                'modelClass' => Ingridient::class,
                'verboseName' => self::t('Ingridients')
            ],
            'description' => [
                'class' => TextField::class,
                'verboseName' => self::t('Description')
            ],
            'is_published' => [
                'class' => BooleanField::class,
                'verboseName' => self::t('Is published')
            ],
            'published_at' => [
                'class' => DateTimeField::class,
                'editable' => false,
                'verboseName' => self::t('Published at')
            ],
            'ingridient' => [
                'class' => TextField::class,
                'verboseName' => self::t('Ingridients')
            ]
        ];
    }


    /**
     * @param null $instance
     * @return RecipeManager
     */
    public static function objectsManager($instance = null)
    {
        $className = get_called_class();
        return new RecipeManager($instance ? $instance : new $className);
    }

    public function getAbsoluteUrl()
    {
        return $this->reverse('recipe:view', ['slug' => $this->slug]);
    }

    public function __toString()
    {
        return (string)$this->name;
    }

    public function beforeSave($owner, $isNew)
    {
        if ($isNew) {
            if (empty($owner->published_at)) {
                $adapter = $this->getDb()->getAdapter();
                $owner->published_at = $adapter->getDateTime();
            }
        }
    }
}