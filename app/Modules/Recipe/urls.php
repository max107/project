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
        'handler' => [\Modules\Recipe\Controller\IndexController::class, 'getIndex'],
        'name' => 'index'
    ]
];