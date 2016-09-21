<?php

use League\Flysystem\Adapter\Local;
use League\Flysystem\Cached\CachedAdapter;
use League\Flysystem\Cached\Storage\Memory as CacheStore;

define('BASE_PATH', realpath(__DIR__ . '/..'));

return [
    'name' => 'Recipe',
    'basePath' => BASE_PATH,
    'modules' => require(__DIR__ . '/modules.php'),
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
            'class' => '\Mindy\Translator\Locale',
            'modulesPath' => BASE_PATH . '/Modules'
        ],
        'auth' => [
            'class' => '\Mindy\Auth\AuthProvider',
            'userClass' => '\Modules\User\Models\User',
            'passwordHashers' => [
                'mindy' => '\Mindy\Auth\PasswordHasher\MindyPasswordHasher'
            ],
            'strategies' => [
                'local' => ['class' => '\Mindy\Auth\Strategy\LocalStrategy']
            ]
        ],
        'db' => function () {
            $databases = [
                'default' => [
                    'dbname' => BASE_PATH . '/sqlite.db',
                    'host' => 'localhost',
                    'driver' => 'pdo_sqlite',
                ]
            ];
            return \Mindy\Creator\Creator::createObject(['class' => '\Mindy\QueryBuilder\ConnectionManager'], $databases);
        },
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
            'mode' => \Mindy\Template\Renderer::RECOMPILE_NORMAL,
            'target' => BASE_PATH . '/runtime/templates',
        ],
        'http' => [
            'class' => '\Mindy\Http\Http',
            'session' => [
                'class' => '\Mindy\Session\Session',
                'handler' => [
                    'class' => '\Mindy\Session\Adapter\NativeSessionAdapter'
                ],
            ],
            'middleware' => require(__DIR__ . '/middleware.php'),
        ],
        'urlManager' => [
            'class' => \Mindy\Router\UrlManager::class,
            'patterns' => require_once(__DIR__ . DIRECTORY_SEPARATOR . 'urls.php')
        ]
    ]
];