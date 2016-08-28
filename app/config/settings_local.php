<?php

use Mindy\Template\Renderer;

return \Mindy\Helper\Settings::override(require(__DIR__ . '/settings.php'), [
    'components' => [
        'template' => [
            'mode' => Renderer::RECOMPILE_ALWAYS,
        ],
    ]
]);