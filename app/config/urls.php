<?php

use Mindy\Router\Patterns;

define('MODULES_PATH', realpath(__DIR__ . '/../Modules'));

return [
//    '/' => new Patterns(MODULES_PATH . '/Example/urls.php'),

    '/admin' => new Patterns(MODULES_PATH . '/Admin/urls.php', 'admin'),
    '/core' => new Patterns(MODULES_PATH . '/Core/urls.php', 'core')
];