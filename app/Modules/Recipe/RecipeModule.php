<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 31/08/16
 * Time: 21:24
 */

namespace Modules\Recipe;

use Mindy\Base\Module;

class RecipeModule extends Module
{
    public function getAdminMenu()
    {
        return [
            [
                'url' => $this->reverse('admin:action', [
                    'action' => 'list',
                    'admin' => 'Recipe',
                    'module' => $this->getId()
                ]),
                'name' => self::t('Recipes'),
                'icon' => 'admin/icons/salad.svg'
            ]
        ];
    }
}