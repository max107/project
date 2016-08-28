<?php

define('BASE_PATH', realpath(__DIR__ . '/..'));

return [
    'basePath' => BASE_PATH,
    'modules' => [
        'Example' => [
            'class' => \Modules\Example\ExampleModule::class
        ]
    ],
    'components' => [
        'template' => [
            'class' => '\Mindy\Template\Renderer',
            'mode' => \Mindy\Template\Renderer::RECOMPILE_NEVER,
            'target' => BASE_PATH . '/runtime/templates',
            'source' => function () {
                $templates = [BASE_PATH . '/templates'];
                $modulesTemplates = glob(BASE_PATH . '/Modules/*/templates');
                $themesTemplates = glob(BASE_PATH . '/themes/*/templates');

                return array_merge($templates, $modulesTemplates, $themesTemplates);
            }
        ],
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