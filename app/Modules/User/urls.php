<?php

return [
    [
        'route' => '/profile',
        'handler' => [\Modules\User\Controllers\ProfileController::class, 'getProfile'],
        'name' => 'profile'
    ]
];
