<?php

namespace Modules\Core;

use function Mindy\app;
use Mindy\Base\Module;
use Modules\Core\Library\CoreLibrary;

class CoreModule extends Module
{
    public static function preConfigure()
    {
        app()->template->addLibrary(new CoreLibrary());
    }

    public function getAdminMenu() : array
    {
        return [
            [
                'url' => $this->reverse('core:module_list'),
                'name' => self::t('Modules'),
                'icon' => 'admin/icons/package.svg'
            ],
            [
                'url' => $this->reverse('core:route_list'),
                'name' => self::t('Routes'),
                'icon' => 'admin/icons/route.svg'
            ]
        ];
    }

    public function getVersion()
    {
        return 3.0;
    }
}
