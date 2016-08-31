<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 29/04/16
 * Time: 16:51
 */

namespace Modules\Admin\Controllers;

use function Mindy\app;
use Modules\Core\Controllers\BackendController;

class DashboardController extends BackendController
{
    /**
     * @return string
     */
    public function actionIndex()
    {
        $module = $this->getModule();
        $this->addTitle($module->t('Dashboard'));

        $dashboards = [];
        $dashboardClasses = $this->getModule()->getDashboardClasses();
        foreach ($dashboardClasses as $cls) {
            $dashboards[] = new $cls;
        }

        $menu = [];
        foreach (app()->getModules(true) as $name => $module) {
            $menu[$module->getName()] = $module->getAdminMenu();
        }

        echo $this->render('admin/index.html', [
            'dashboards' => $dashboards,
            'menu' => $menu
        ]);
    }
}