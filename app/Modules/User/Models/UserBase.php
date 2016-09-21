<?php

namespace Modules\User\Models;

use function Mindy\app;
use Mindy\Auth\IUser;
use Mindy\Auth\UserInterface;
use Mindy\Base\Mindy;
use Mindy\Orm\Fields\BooleanField;
use Mindy\Orm\Fields\CharField;
use Mindy\Orm\Fields\DateTimeField;
use Mindy\Orm\Fields\EmailField;
use Mindy\Orm\Fields\ForeignField;
use Mindy\Orm\Fields\HasManyField;
use Mindy\Orm\Fields\IntField;
use Mindy\Orm\Fields\ManyToManyField;
use Mindy\Orm\Fields\PasswordField;
use Mindy\Orm\Model;
use Mindy\Permissions\PermissionTrait;
use Modules\Sites\Models\Site;

/**
 * Class UserBase
 * @package Modules\User
 * @method static \Modules\User\Models\UserManager objects($instance = null)
 */
abstract class UserBase extends Model implements UserInterface
{
    use PermissionTrait;

    const GUEST_ID = -1;

    const TRUSTED_FIELDS = [
        'id',
        'username',
        'name',
        'phone',
        'email',
        'last_login',
        'created_at',
        'is_active'
    ];

    /**
     * @return array
     */
    public function getSafeAttributes() : array
    {
        $attrs = [];
        foreach (self::TRUSTED_FIELDS as $name) {
            $attrs[$name] = $this->{$name};
        }
        return $attrs;
    }

    public function isGuest() : bool
    {
        return $this->id === null;
    }

    public static function getFields()
    {
        return [
            "username" => [
                'class' => CharField::class,
                'verboseName' => self::t("Username"),
                'unique' => true
            ],
            "name" => [
                'class' => CharField::class,
                'verboseName' => self::t("Name"),
                'null' => true,
            ],
            "email" => [
                'class' => EmailField::class,
                'verboseName' => self::t("Email"),
                'null' => true,
            ],
            'phone' => [
                'class' => CharField::class,
                'verboseName' => self::t('Phone'),
                'null' => true
            ],
            "password" => [
                'class' => PasswordField::class,
                'null' => true,
                'verboseName' => self::t("Password"),
            ],
            "is_active" => [
                'class' => BooleanField::class,
                'verboseName' => self::t("Is active"),
            ],
            "is_staff" => [
                'class' => BooleanField::class,
                'verboseName' => self::t("Is staff"),
            ],
            "is_superuser" => [
                'class' => BooleanField::class,
                'verboseName' => self::t("Is superuser"),
                'helpText' => self::t('Superuser has all permissions')
            ],
            'last_login' => [
                'class' => DateTimeField::class,
                'null' => true,
                'verboseName' => self::t("Last login"),
                'editable' => false,
            ],
            'groups' => [
                'class' => ManyToManyField::class,
                'modelClass' => Group::class,
                'verboseName' => self::t("Groups"),
            ],
            'permissions' => [
                'class' => ManyToManyField::class,
                'modelClass' => Permission::class,
                'through' => UserPermission::class,
                'throughLink' => ['user_id', 'permission_id'],
                'verboseName' => self::t("Permissions"),
            ],
            'hash_type' => [
                'class' => CharField::class,
                'default' => 'mindy',
                'editable' => false,
                'verboseName' => self::t("Password hash strategy"),
            ],
            'created_at' => [
                'class' => DateTimeField::class,
                'autoNowAdd' => true,
                'editable' => false,
                'verboseName' => self::t('Created at')
            ],
            'session' => [
                'class' => HasManyField::class,
                'modelClass' => Session::class,
                'editable' => false,
                'verboseName' => self::t('Session')
            ]
        ];
    }

    public function getIp()
    {
        return app()->http->getRequest()->getUserHostAddress();
    }

    public function __toString()
    {
        return (string)$this->username;
    }

    /**
     * Get current user session model
     * @return Session
     */
    public function getSession()
    {
        return Session::objects()->latest()->get([
            'id' => Mindy::app()->session->getId()
        ]);
    }

    /**
     * @param null $instance
     * @return \Mindy\Orm\Manager|UserManager
     */
    public static function objectsManager($instance = null)
    {
        $className = get_called_class();
        return new UserManager($instance ? $instance : new $className);
    }

    /**
     * @param Model $owner
     * @param $isNew
     */
    public function afterSave($owner, $isNew)
    {
        if ($isNew) {
            /**
             * Добавляем пользователя в группы по умолчанию
             */
            $groups = Group::objects()->filter(['is_default' => true])->all();
            foreach ($groups as $group) {
                $owner->groups->link($group);
            }

            /**
             * Назначаем пользователю права доступа по умолчанию
             */
            $permission = Permission::objects()->filter(['is_default' => true])->all();
            foreach ($permission as $perm) {
                $owner->permissions->link($perm);
            }
        }
    }

    /**
     * Возвращаем только доверенные поля модели
     * @return array
     */
    public function toArray()
    {
        $attributes = [];
        foreach (self::TRUSTED_FIELDS as $field) {
            $attributes[$field] = $this->{$field};
        }
        return $attributes;
    }

    /**
     * @param $password
     * @param null $hasherType
     * @return bool
     * @throws \Exception
     */
    public function changePassword($password, $hasherType = null)
    {
        $auth = app()->auth;
        if ($hasherType === null) {
            if (empty($this->hash_type)) {
                $hasherType = $auth->defaultPasswordHasher;
            } else {
                $hasherType = $this->hash_type;
            }
        }
        $this->password = $auth->getPasswordHasher($hasherType)->hashPassword($password);
        return $this->save(['password']);
    }
}
