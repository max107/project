<?php

return [
    'basePath' => __DIR__,
    'modules' => [
        'Example' => [
            'class' => \Modules\Example\ExampleModule::class
        ]
    ],
    'components' => [
        'http' => [
            'class' => '\Mindy\Http\Http',
            'middleware' => require(__DIR__ . '/middleware.php'),
        ],
        'urlManager' => [
            'class' => \Mindy\Router\UrlManager::class,
            'patterns' => require_once(__DIR__ . DIRECTORY_SEPARATOR . 'urls.php')
        ]
    ]
];