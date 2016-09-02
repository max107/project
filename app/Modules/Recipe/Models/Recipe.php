<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 31/08/16
 * Time: 21:24
 */

namespace Modules\Recipe\Models;

use Mindy\Orm\Fields\CharField;
use Mindy\Orm\Fields\ImageField;
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
                    'thumb' => [340, 260, 'method' => 'adaptiveResize']
                ]
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
}