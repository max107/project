<?php

return [
    [
        'route' => '/',
        'name' => 'index',
        'callback' => '\Modules\Admin\Controllers\AdminDispatchController:actionDispatchIndex'
    ],
    [
        'route' => '/dashboard',
        'name' => 'dashboard',
        'callback' => '\Modules\Admin\Controllers\DashboardController:actionIndex'
    ],
    [
        'route' => '/settings',
        'name' => 'settings',
        'callback' => '\Modules\Admin\Controllers\SettingsController:actionIndex'
    ],

    [
        'route' => '/auth/login',
        'name' => 'login',
        'callback' => '\Modules\Admin\Controllers\AuthController:actionLogin'
    ],
    [
        'route' => '/auth/logout',
        'name' => 'logout',
        'callback' => '\Modules\Admin\Controllers\AuthController:actionLogout'
    ],
    [
        'route' => '/auth/recover',
        'name' => 'recover',
        'callback' => '\Modules\Admin\Controllers\AuthController:actionRecover'
    ],

    [
        'route' => '/manage/{module:a}/{admin:a}/{action:a}',
        'name' => 'action',
        'callback' => '\Modules\Admin\Controllers\AdminDispatchController:actionDispatch'
    ],
];
