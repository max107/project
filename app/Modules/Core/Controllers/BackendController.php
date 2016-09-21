<?php

namespace Modules\Core\Controllers;

use function Mindy\app;
use Mindy\Base\Mindy;
use Mindy\Exception\HttpException;
use Modules\Core\Components\MetaTrait;

class BackendController extends Controller
{
    use MetaTrait;

    public function accessRules()
    {
        return [
            [
                // allow only authorized users
                'allow' => true,
                'users' => ['@'],
                'deniedCallback' => [self::class, 'actionAccessDenied'],
                'expression' => function ($user) {
                    return $user->is_staff || $user->is_superuser;
                }
            ],
            [
                // deny all users
                'allow' => false,
                'users' => ['*'],
                'deniedCallback' => function() {
                    Mindy::app()->request->redirect('admin:login');
                }
            ],
        ];
    }

    public static function actionAccessDenied($rule = null)
    {
        throw new HttpException(403, app()->t('main', 'You are not authorized to perform this action.'));
    }
}
