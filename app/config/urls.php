<?php

define('MODULES_PATH', realpath(__DIR__ . '/../Modules'));

return [
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
        'namespace' => 'example',
        'routes' => include(MODULES_PATH . '/Example/urls.php')
    ]
];