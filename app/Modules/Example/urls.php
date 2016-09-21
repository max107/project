<?php

use Mindy\Middleware\ResponseTimeMiddleware;
use Mindy\Permissions\Rule;
use Modules\Example\Controllers\ExampleController;

return [
    [
        'route' => '/',
        'callback' => [ExampleController::class, 'getIndex'],
    ],
    [
        'route' => '/test/acl/denied',
        'callback' => [ExampleController::class, 'getIndex'],
        'params' => [
            'rules' => [
                ['class' => Rule::class, 'users' => '@']
            ]
        ]
    ],
    [
        'route' => '/test/middleware',
        'callback' => [ExampleController::class, 'getIndex'],
        'params' => [
            'middleware' => [
                'response_time' => ['class' => ResponseTimeMiddleware::class]
            ]
        ]
    ],
];