<?php

namespace Modules\Core;

use Mindy\Base\Module;
use Mindy\Di\ServiceLocatorInterface;
use Modules\Core\Library\CoreLibrary;

class CoreModule extends Module
{
    /**
     * Method will be invoked on registration of a service provider implementing
     * this interface. Provides ability for eager loading of Service Providers.
     *
     * @param ServiceLocatorInterface $serviceLocator
     */
    public function boot(ServiceLocatorInterface $serviceLocator)
    {
        $serviceLocator->get('template')->addLibrary(new CoreLibrary());
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
