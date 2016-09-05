<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 01/09/16
 * Time: 17:06
 */

namespace Modules\Recipe\Controller;

use Mindy\Pagination\Pagination;
use Modules\Core\Controllers\Controller;
use Modules\Recipe\Models\Recipe;

class RecipeController extends Controller
{
    public function getIndex()
    {
        $newQs = Recipe::objects()
            ->published()
            ->order(['-published_at']);
        $newPager = new Pagination($newQs);

        $popularQs = Recipe::objects()
            ->published()
            ->order(['hint']);
        $popularPager = new Pagination($popularQs);
        
        echo $this->render('recipe/index.html', [
            'new_pager' => $newPager,
            'new_recipes' => $newPager->paginate(),
            'popular_pager' => $popularPager,
            'popular_recipes' => $popularPager->paginate()
        ]);
    }

    public function getList()
    {
        $qs = Recipe::objects()
            ->published()
            ->order(['-published_at']);

        $pager = new Pagination($qs);
        echo $this->render('recipe/list.html', [
            'pager' => $pager,
            'recipes' => $pager->paginate()
        ]);
    }

    public function getView($slug)
    {
        $recipe = Recipe::objects()->published()->get(['slug' => $slug]);
        if ($recipe === null) {
            $this->error(404);
        }

        $recipe->hint += 1;
        $recipe->save(['hint']);

        $qs = Recipe::objects()
            ->published()
            ->exclude(['id' => $recipe->id])
            ->limit(6)
            ->order(['?']);

        $categoryIds = $recipe->categories->valuesList(['id'], true);
        if (empty($categoryIds) === false) {
            $qs->filter(['categories__id__in' => $categoryIds]);
        }

        echo $this->render('recipe/view.html', [
            'recipe' => $recipe,
            'related' => $qs->all()
        ]);
    }

    public function getFavorite()
    {
        echo $this->render('recipe/favorite/list.html', [

        ]);
    }
}
