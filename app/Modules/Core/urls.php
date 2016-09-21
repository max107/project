<?php

return [
    [
        'route' => '/modules/',
        'name' => 'module_list',
        'callback' => '\Modules\Core\Controllers\Admin\ModulesController:actionList'
    ],
    [
        'route' => '/routes/',
        'name' => 'route_list',
        'callback' => '\Modules\Core\Controllers\Admin\RouteController:actionList'
    ],
    '/module/' => [
        'namespace' => 'module',
        'routes' => [
            [
                'route' => '/list',
                'name' => 'list',
                'callback' => '\Modules\Core\Controllers\Admin\ModulesController:actionList'
            ],
        ]
    ]
];
