<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 01/09/16
 * Time: 20:52
 */

namespace Modules\Auth\Models;

use Mindy\Orm\Fields\BooleanField;
use Mindy\Orm\Fields\DateTimeField;
use Mindy\Orm\Fields\ForeignField;
use Mindy\Orm\Fields\IpField;
use Mindy\Orm\Model;
use Modules\User\Models\User;

class AuthAttempt extends Model
{
    public static function getFields()
    {
        return [
            'user' => [
                'class' => ForeignField::class,
                'modelClass' => User::class,
                'verboseName' => self::t('User')
            ],
            'ip' => [
                'class' => IpField::class,
                'verboseName' => self::t('Ip address'),
            ],
            'last_login' => [
                'class' => DateTimeField::class,
                'autoNow' => true,
                'editable' => false,
                'verboseName' => self::t('Last login')
            ],
            'is_success' => [
                'class' => BooleanField::class,
                'default' => false,
                'verboseName' => self::t('Is success')
            ]
        ];
    }

    public function __toString()
    {
        return strtr('{user} ({ip}) - {last_login} {status}', [
            '{user}' => (string)$this->user,
            '{ip}' => $this->ip,
            '{last_login}' => $this->last_login,
            '{status}' => $this->is_success ? self::t('Successfull') : self::t('Failed')
        ]);
    }
}