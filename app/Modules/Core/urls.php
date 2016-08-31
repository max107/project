<?php

return [
    [
        'route' => '/modules/',
        'name' => 'module_list',
        'callback' => '\Modules\Core\Controllers\Admin\ModulesController:list'
    ],
    [
        'route' => '/routes/',
        'name' => 'route_list',
        'callback' => '\Modules\Core\Controllers\Admin\RouteController:list'
    ],
    '/modules/' => [
        'namespace' => 'module',
        'routes' => [
            [
                'route' => '/list',
                'name' => 'list',
                'callback' => '\Modules\Core\Controllers\Admin\ModulesController:list'
            ],
        ]
    ]
];
