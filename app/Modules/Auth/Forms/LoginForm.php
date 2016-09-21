<?php
/**
 * Author: Falaleev Maxim (max107)
 * Email: <max@studio107.ru>
 * Company: Studio107 <http://studio107.ru>
 * Date: 11/05/16 12:02
 */

namespace Modules\Auth\Forms;

use Mindy\Base\Mindy;
use Mindy\Form\Fields\PasswordField;
use Mindy\Form\Fields\TextField;
use Mindy\Form\Form;
use Modules\Auth\AuthModule;

/**
 * Class LoginForm
 * @package Modules\User
 */
class LoginForm extends Form
{
    public function getFields() : array
    {
        return [
            'username' => [
                'class' => TextField::class,
                'label' => AuthModule::t('modules.Auth', 'Email or username'),
                'html' => [
                    'autocomplete' => "off",
                    'required'
                ]
            ],
            'password' => [
                'class' => PasswordField::class,
                'label' => AuthModule::t('modules.Auth', 'Password'),
                'html' => [
                    'autocomplete' => "off",
                    'required'
                ]
            ]
        ];
    }

    /**
     * @return bool
     */
    public function login()
    {
        $username = $this->username->getValue();
        $password = $this->password->getValue();

        $auth = Mindy::app()->auth;
        $state = $auth->authenticate('local', [
            'username' => $username,
            'password' => $password
        ]);

        if (is_array($state)) {
            $this->setErrors($state);
        }

        return count($this->getErrors()) === 0;
    }
}
