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
    ],
    [
        'route' => '/user/favorite',
        'handler' => [\Modules\Recipe\Controller\RecipeController::class, 'getFavorite'],
        'name' => 'favorite'
    ],
    
    '/shopping_list' => [
        'namespace' => 'shopping_list',
        'routes' => [
            [
                'route' => '/add',
                'handler' => [\Modules\Recipe\Controller\ShoppingListController::class, 'postAdd'],
                'name' => 'add'
            ],
            [
                'route' => '/',
                'handler' => [\Modules\Recipe\Controller\ShoppingListController::class, 'getView'],
                'name' => 'list'
            ],
        ]
    ]
];