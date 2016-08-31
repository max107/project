<?php

$autoloader = include(__DIR__ . '/../vendor/autoload.php');

defined('MINDY_DEBUG') or define('MINDY_DEBUG', true);

$config = 'settings.php';
if (MINDY_DEBUG) {
    $whoops = new \Whoops\Run;
    if (php_sapi_name() === 'cli') {
        $whoops->pushHandler(new \Whoops\Handler\PlainTextHandler);
    } else {
        $whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);
    }
    $whoops->register();

    $config = 'settings_local.php';
}

$app = \Mindy\Base\Mindy::getInstance(__DIR__ . '/../app/config/' . $config);
$app->run();
