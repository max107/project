<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 28/08/16
 * Time: 10:51
 */

namespace Modules\Example\Controllers;

use Mindy\Controller\BaseController;
use Mindy\Helper\Traits\RenderTrait;

class ExampleController extends BaseController
{
    use RenderTrait;

    protected function render($template, array $data = [])
    {
        return self::renderTemplate($template, $data);
    }

    public function getIndex()
    {
        echo $this->render('example/index.html', [
            'foo' => 'bar'
        ]);
    }
}