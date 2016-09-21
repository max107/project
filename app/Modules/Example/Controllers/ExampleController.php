<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 28/08/16
 * Time: 10:51
 */

namespace Modules\Example\Controllers;

use Modules\Core\Controllers\Controller;
use Modules\Example\Models\Category;

class ExampleController extends Controller
{
    public function getIndex()
    {
        $models = Category::objects()->all();
        echo $this->render('example/index.html', [
            'models' => $models
        ]);
    }
}