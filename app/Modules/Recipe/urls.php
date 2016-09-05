<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 01/09/16
 * Time: 17:06
 */

return [
    [
        'route' => '/',
        'handler' => [\Modules\Recipe\Controller\RecipeController::class, 'getIndex'],
        'name' => 'index'
    ],
    [
        'route' => '/recipe/{slug:c}',
        'handler' => [\Modules\Recipe\Controller\RecipeController::class, 'getList'],
        'name' => 'list'
    ],
    [
        'route' => '/{slug:c}',
        'handler' => [\Modules\Recipe\Controller\RecipeController::class, 'getView'],
        'name' => 'view'
    ]
];