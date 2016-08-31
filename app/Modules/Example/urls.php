<?php

use Modules\Example\Controllers\ExampleController;

return [
    [
        'route' => '/',
        'callback' => [ExampleController::class, 'getIndex']
    ],
];