<?php

return [
    'csrf' => [
        'class' => \Mindy\Middleware\CsrfMiddleware::class
    ],
    'response_time' => [
        'class' => \Mindy\Middleware\ResponseTimeMiddleware::class
    ]
];