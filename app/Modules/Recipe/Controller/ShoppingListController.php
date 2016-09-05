<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 05/09/16
 * Time: 17:06
 */

namespace Modules\Recipe\Controller;

use function Mindy\app;
use Modules\Core\Controllers\Controller;
use Modules\Recipe\Models\Recipe;
use Modules\Recipe\Models\ShoppingList;

class ShoppingListController extends Controller
{
    public function getView()
    {
        $user = app()->auth->getUser();

        list ($model, $created) = ShoppingList::objects()->getOrCreate(['user' => $user]);

        echo $this->render('recipe/shopping_list/view.html', [
            'shopping_list' => $model
        ]);
    }

    public function postAdd()
    {
        $id = (int)$this->getRequest()->post->get('id');
        if (empty($id)) {
            echo $this->json([
                'status' => false,
                'error' => 'Missing id'
            ]);
            app()->end();
        }

        $recipe = Recipe::objects()->get(['id' => $id]);
        if ($recipe === null) {
            echo $this->json([
                'status' => true,
                'error' => 'Recipe not found'
            ]);
            app()->end();
        }

        $recipe->addToShoppingList();

        echo $this->json([
            'status' => true
        ]);
    }

    public function postRemove()
    {
        $id = (int)$this->getRequest()->post->get('id');
        if (empty($id)) {
            echo $this->json([
                'status' => false,
                'error' => 'Missing id'
            ]);
            app()->end();
        }

        $recipe = Recipe::objects()->get(['id' => $id]);
        if ($recipe === null) {
            echo $this->json([
                'status' => true,
                'error' => 'Recipe not found'
            ]);
            app()->end();
        }

        $recipe->removeFromShoppingList();

        echo $this->json([
            'status' => true
        ]);
    }
}