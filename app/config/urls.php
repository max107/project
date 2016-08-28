<?php

use Mindy\Router\Patterns;

return [
    '/' => new Patterns(__DIR__ . '/../Modules/Example/urls.php'),

    '/admin' => new Patterns(__DIR__ . '/../Modules/Admin/urls.php', 'admin')
];