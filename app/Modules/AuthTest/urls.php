<?php
/**
 * Author: Falaleev Maxim (max107)
 * Email: <max@studio107.ru>
 * Company: Studio107 <http://studio107.ru>
 * Date: 11/05/16 12:02
 */

return [
    /*
     * Авторизация, выход, регистрация
     */
    [
        'route' => '/login',
        'name' => 'login',
        'callback' => '\Modules\Auth\Controllers\AuthController:actionLogin'
    ],
    [
        'route' => '/logout',
        'name' => 'logout',
        'callback' => '\Modules\Auth\Controllers\AuthController:actionLogout'
    ],
    [
        'route' => '/registration/{profile:c}?',
        'name' => 'registration',
        'callback' => '\Modules\Auth\Controllers\RegistrationController:actionDispatch'
    ],

    /*
     * Изменение пароля
     */
    [
        'route' => '/password/change',
        'name' => 'change_password',
        'callback' => '\Modules\Auth\Controllers\ChangePasswordController:actionIndex'
    ],
    [
        'route' => '/password/succes',
        'name' => 'change_password_succes',
        'callback' => '\Modules\Auth\Controllers\ChangePasswordController:actionSuccess'
    ],

    /*
     * Активация учетной записи после в случаях, если пользователь
     * не получал первого письма с активацей после регистрации.
     * Повторная активация.
     */
    [
        'route' => '/activation/{type:s}',
        'name' => 'activation',
        'callback' => '\Modules\Auth\Controllers\ActivationController:actionForm'
    ],
    [
        'route' => '/activation/{type:s}/process',
        'name' => 'activation_process',
        'callback' => '\Modules\Auth\Controllers\ActivationController:actionProcess'
    ],
    [
        'route' => '/activation/{type:s}/confirm',
        'name' => 'activation_confirm',
        'callback' => '\Modules\Auth\Controllers\ActivationController:actionConfirm'
    ],
    [
        'route' => '/activation/{type:s}/sended',
        'name' => 'activation_sended',
        'callback' => '\Modules\Auth\Controllers\ActivationController:actionSended'
    ],

    /*
     * Восстановление пароля
     */
    [
        'route' => '/recovery/{type:s}',
        'name' => 'recovery',
        'callback' => '\Modules\Auth\Controllers\RecoveryController:actionForm'
    ],
    [
        'route' => '/recovery/{type:s}/process',
        'name' => 'recovery_process',
        'callback' => '\Modules\Auth\Controllers\RecoveryController:actionProcess'
    ],
    [
        'route' => '/recovery/{type:s}/confirm',
        'name' => 'recovery_confirm',
        'callback' => '\Modules\Auth\Controllers\RecoveryController:actionConfirm'
    ],
];