<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 21/09/16
 * Time: 21:59
 */

namespace Modules\User\Provider;

use Mindy\Auth\UserProvider\UserProviderInterface;
use Modules\User\Models\User;

/**
 * Class UserProvider
 * @package Modules\User\Provider
 */
class UserProvider implements UserProviderInterface
{
    /**
     * @param array $attributes
     * @return null|\Mindy\Auth\UserInterface|\Mindy\Orm\ModelInterface
     */
    public function get(array $attributes)
    {
        return User::objects()->get($attributes);
    }
}