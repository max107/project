<?php

define('BASE_PATH', realpath(__DIR__ . '/..'));

return [
    'basePath' => BASE_PATH,
    'modules' => [
        'Admin',
        'User',
        'Core',
        'Example'
    ],
    'components' => [
        'permissions' => [
            'class' => '\Mindy\Permissions\PermissionManager'
        ],
        'auth' => [
            'class' => '\Mindy\Auth\AuthProvider',
            'userClass' => '\Modules\User\Models\User'
        ],
        'db' => [
            'class' => '\Mindy\Query\ConnectionManager',
            'databases' => [
                'default' => [
                    'class' => '\Mindy\Query\Connection',
                    'dsn' => 'mysql:host=127.0.0.1;dbname=test',
                    'username' => 'root',
                    'password' => '',
                    'charset' => 'utf8',
                ]
            ]
        ],
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