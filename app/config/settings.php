<?php

use League\Flysystem\Adapter\Local;
use League\Flysystem\Cached\CachedAdapter;
use League\Flysystem\Cached\Storage\Memory as CacheStore;

define('BASE_PATH', realpath(__DIR__ . '/..'));

return [
    'name' => 'Recipe',
    'basePath' => BASE_PATH,
    'modules' => [
        'Admin',
        'Auth',
        'Core',
        'Example',
        'Mail',
        'Recipe',
        'User',
        'UserActions'
    ],
    'components' => [
        'storage' => [
            'class' => '\Mindy\Storage\Storage',
            'adapters' => [
                'default' => function () {
                    $path = realpath(BASE_PATH . '/../WWW/media');
                    // Create the adapter
                    $localAdapter = new Local($path);
                    // Create the cache store
                    $cacheStore = new CacheStore();
                    // Decorate the adapter
                    return new CachedAdapter($localAdapter, $cacheStore);
                }
            ]
        ],
//        'permissions' => [
//            'class' => '\Mindy\Permissions\PermissionManager'
//        ],
        'locale' => [
            'class' => '\Mindy\Locale\Locale'
        ],
        'auth' => [
            'class' => '\Mindy\Auth\AuthProvider',
            'userClass' => '\Modules\User\Models\User',
            'passwordHashers' => [
                'mindy' => '\Mindy\Auth\PasswordHasher\MindyPasswordHasher'
            ],
            'strategies' => [
                'local' => '\Mindy\Auth\Strategy\LocalStrategy'
            ]
        ],
        'db' => [
            'class' => '\Mindy\Query\ConnectionManager',
            'databases' => [
                'default' => [
                    'class' => '\Mindy\Query\Connection',
                    'dsn' => 'mysql:host=localhost;dbname=mindy2',
                    'username' => 'root',
                    'password' => '',
                    'charset' => 'utf8',
                ]
            ]
        ],
        'finder' => [
            'class' => '\Mindy\Finder\Finder',
            'finders' => [
                ['class' => '\Mindy\Finder\Finder\TemplateFinder', 'basePath' => BASE_PATH],
                /*
                [
                    'class' => '\Mindy\Finder\Finder\ThemeTemplateFinder',
                    'theme' => function () {
                        static $isMobile = false;
                        return $isMobile ? 'mobile' : 'default';
                    }
                ],
                */
                ['class' => '\Mindy\Finder\Finder\AppTemplateFinder', 'basePath' => BASE_PATH . '/Modules'],
            ],
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