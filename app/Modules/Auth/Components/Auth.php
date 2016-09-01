<?php
/**
 * Author: Falaleev Maxim (max107)
 * Email: <max@studio107.ru>
 * Company: Studio107 <http://studio107.ru>
 * Date: 11/05/16 12:02
 */

namespace Modules\Auth\Components;

use Mindy\Base\Mindy;
use Mindy\Http\Cookie;
use Mindy\Orm\Model;

/**
 * Class Auth
 * @package Modules\User
 */
class Auth
{
    /**
     * @var bool
     */
    public $autoRenewCookie = true;
    /**
     * @var bool
     */
    public $allowAutoLogin = true;
    /**
     * @var string
     */
    public $modelClass = '\Modules\User\Models\User';
    /**
     * @var integer timeout in seconds after which user is logged out if inactive.
     * If this property is not set, the user will be logged out after the current session expires
     * (c.f. {@link CHttpSession::timeout}).
     * @since 1.1.7
     * @var int 3600 * 24 * $days
     */
    public $authTimeout = 2592000;
    /**
     * @var integer timeout in seconds after which user is logged out regardless of activity.
     * @since 1.1.14
     */
    public $absoluteAuthTimeout;
    /**
     * @var array the property values (in name-value pairs) used to initialize the identity cookie.
     * Any property of {@link CHttpCookie} may be initialized.
     * This property is effective only when {@link allowAutoLogin} is true.
     */
    public $identityCookie;

    /**
     * Initializes the application component.
     * This method overrides the parent implementation by starting session,
     * performing cookie-based authentication if enabled, and updating the flash variables.
     */
    public function init()
    {
        if ($this->getIsGuest() && $this->allowAutoLogin) {
            $this->restoreFromCookie();
        } elseif ($this->autoRenewCookie && $this->allowAutoLogin) {
            $this->renewCookie();
        }

        if ($this->getIsGuest()) {
            $this->setModel($this->createGuestModel());
        }

        $this->updateAuthStatus();
    }

    /**
     * Renews the identity cookie.
     * This method will set the expiration time of the identity cookie to be the current time
     * plus the originally specified cookie duration.
     * @since 1.1.3
     */
    protected function renewCookie()
    {
        $request = Mindy::app()->getComponent('request');
        $cookies = $request->cookies;
        $cookie = $cookies->itemAt($this->getStateKeyPrefix());
        if ($cookie && !empty($cookie->value) && ($data = Mindy::app()->getSecurityManager()->validateData($cookie->value)) !== false) {
            $data = @unserialize($data);
            if (is_array($data) && isset($data[0], $data[1])) {
                list($id, $duration) = $data;
                $model = $this->loadModel($id);
                $model->setIsGuest(false);
                $this->saveToCookie($model, $duration);
            }
        }
    }

    /**
     * Updates the authentication status according to {@link authTimeout}.
     * If the user has been inactive for {@link authTimeout} seconds, or {link absoluteAuthTimeout} has passed,
     * he will be automatically logged out.
     * @since 1.1.7
     */
    protected function updateAuthStatus()
    {
        if (($this->authTimeout !== null || $this->absoluteAuthTimeout !== null) && !$this->getIsGuest()) {
            $expires = $this->getState(self::AUTH_TIMEOUT_VAR);
            $expiresAbsolute = $this->getState(self::AUTH_ABSOLUTE_TIMEOUT_VAR);

            if ($expires !== null && $expires < time() || $expiresAbsolute !== null && $expiresAbsolute < time()) {
                $this->logout(false);
            } else {
                $this->setState(self::AUTH_TIMEOUT_VAR, time() + $this->authTimeout);
            }
        }
    }

    /**
     * Populates the current user object with the information obtained from cookie.
     * This method is used when automatic login ({@link allowAutoLogin}) is enabled.
     * The user identity information is recovered from cookie.
     * Sufficient security measures are used to prevent cookie data from being tampered.
     * @see saveToCookie
     */
    protected function restoreFromCookie()
    {
        $app = Mindy::app();
        $request = $app->request;
        $cookie = $request->cookies->get($this->getStateKeyPrefix());
        if ($cookie && !empty($cookie->value) && is_string($cookie->value) && ($data = $app->getSecurityManager()->validateData($cookie->value)) !== false) {
            $data = @unserialize($data);
            if (is_array($data) && isset($data[0], $data[1])) {
                list($id, $duration) = $data;
                if ($model = $this->loadModel($id)) {
                    $model->setIsGuest(false);
                    $this->setModel($model);

                    if ($this->autoRenewCookie) {
                        $this->saveToCookie($model, $duration);
                    }
                }
            }
        }
    }

    /**
     * Creates a cookie to store identity information.
     * @param string $name the cookie name
     * @return Cookie the cookie used to store identity information
     */
    protected function createIdentityCookie($name)
    {
        $cookie = new Cookie($name, '');
        if (is_array($this->identityCookie)) {
            foreach ($this->identityCookie as $name => $value) {
                $cookie->$name = $value;
            }
        }
        return $cookie;
    }

    /**
     * Saves necessary user data into a cookie.
     * This method is used when automatic login ({@link allowAutoLogin}) is enabled.
     * This method saves user ID, username, other identity states and a validation key to cookie.
     * These information are used to do authentication next time when user visits the application.
     * @param \Mindy\Orm\Model $model
     * @param integer $duration number of seconds that the user can remain in logged-in status. Defaults to 0, meaning login till the user closes the browser.
     * @see restoreFromCookie
     */
    protected function saveToCookie(Model $model, $duration)
    {
        $app = Mindy::app();
        $cookie = $this->createIdentityCookie($this->getStateKeyPrefix());
        $cookie->expire = time() + $duration;
        $cookie->value = $app->getSecurityManager()->hashData(serialize([$model->pk, $duration]));
        $app->request->cookies->add($cookie->name, $cookie);
    }
}
