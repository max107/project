<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 31/08/16
 * Time: 21:24
 */

namespace Modules\Recipe;

use function Mindy\app;
use Mindy\Base\Module;
use Modules\Recipe\Library\RecipeLibrary;

class RecipeModule extends Module
{
    public static function preConfigure()
    {
        app()->template->addLibrary(new RecipeLibrary);
    }

    public function getAdminMenu()
    {
        return [
            [
                'url' => $this->reverse('admin:action', [
                    'action' => 'list',
                    'admin' => 'RecipeAdmin',
                    'module' => $this->getId()
                ]),
                'name' => self::t('Recipes'),
                'icon' => 'admin/icons/salad.svg'
            ],
            [
                'url' => $this->reverse('admin:action', [
                    'action' => 'list',
                    'admin' => 'CategoryAdmin',
                    'module' => $this->getId()
                ]),
                'name' => self::t('Categories'),
                'icon' => 'admin/icons/salad.svg'
            ]
        ];
    }
}