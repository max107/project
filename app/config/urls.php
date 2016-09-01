<?php

use Mindy\Router\Patterns;

define('MODULES_PATH', realpath(__DIR__ . '/../Modules'));

return [
//    '/' => new Patterns(MODULES_PATH . '/Example/urls.php'),

    '/admin' => [
        'namespace' => 'admin',
        'routes' => include(MODULES_PATH . '/Admin/urls.php')
    ],
    '/core' => [
        'namespace' => 'core',
        'routes' => include(MODULES_PATH . '/Core/urls.php')
    ],
    '/auth' => [
        'namespace' => 'auth',
        'routes' => include(MODULES_PATH . '/Auth/urls.php')
    ],
    '/user' => [
        'namespace' => 'user',
        'routes' => include(MODULES_PATH . '/User/urls.php')
    ],
    '/' => [
        'namespace' => 'recipe',
        'routes' => include(MODULES_PATH . '/Recipe/urls.php')
    ]
];