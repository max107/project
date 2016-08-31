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
    ]
];