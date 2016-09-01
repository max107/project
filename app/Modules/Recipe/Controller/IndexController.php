<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 01/09/16
 * Time: 17:06
 */

namespace Modules\Recipe\Controller;

use Modules\Core\Controllers\Controller;

class IndexController extends Controller
{
    public function getIndex()
    {
        echo $this->render('recipe/index.html');
    }
}
