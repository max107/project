<?php

use League\Flysystem\Adapter\Local;
use League\Flysystem\Cached\CachedAdapter;
use League\Flysystem\Cached\Storage\Memory as CacheStore;

define('BASE_PATH', realpath(__DIR__ . '/..'));

return [
    'name' => 'My App',
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
            'modulesPath' => BASE_PATH . '/Modules',
            'locale' => 'ru_RU'
        ],
        'auth' => [
            'class' => '\Mindy\Auth\AuthProvider',
            'userClass' => '\Modules\User\Models\User',
            'userProvider' => [
                'class' => '\Modules\User\Provider\UserProvider'
            ],
            'passwordHashers' => [
                'mindy' => '\Mindy\Auth\PasswordHasher\MindyPasswordHasher'
            ],
            'strategies' => [
                'local' => ['class' => '\Mindy\Auth\Strategy\LocalStrategy']
            ]
        ],
        'db' => [
            'class' => '\Mindy\QueryBuilder\ConnectionManager',
            'connections' => [
                'default' => [
                    'path' => BASE_PATH . '/sqlite.db',
                    'driver' => 'pdo_sqlite',
                ]
            ]
        ],
        'finder' => [
            'class' => '\Mindy\Finder\Finder',
            'finders' => [
                /*
                ['class' => '\Mindy\Finder\TemplateFinder\ThemeTemplateFinder', 'theme' => function () {
                    return 'default';
                }],
                */
                ['class' => '\Mindy\Finder\TemplateFinder\TemplateFinder', 'basePath' => BASE_PATH],
                ['class' => '\Mindy\Finder\TemplateFinder\AppTemplateFinder', 'basePath' => BASE_PATH . '/Modules'],
            ],
        ],
        'template' => [
            'class' => '\Mindy\Template\Renderer',
            'mode' => \Mindy\Template\Renderer::RECOMPILE_NEVER,
            'target' => BASE_PATH . '/runtime/templates',
        ],
        'http' => [
            'class' => '\Mindy\Http\Http',
            'session' => [
                'class' => '\Mindy\Session\Session',
                'handler' => [
                    'class' => '\Mindy\Session\Handler\NativeSessionHandler'
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