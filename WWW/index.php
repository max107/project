<?php

$autoloader = include(__DIR__ . '/../vendor/autoload.php');

defined('MINDY_DEBUG') or define('MINDY_DEBUG', true);

$config = 'settings.php';
if (MINDY_DEBUG) {
    $whoops = new \Whoops\Run;
    $whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);
    $whoops->register();

    $config = 'settings_local.php';
}

$app = \Mindy\Base\Mindy::getInstance(__DIR__ . '/../app/config/' . $config);
$app->run();
