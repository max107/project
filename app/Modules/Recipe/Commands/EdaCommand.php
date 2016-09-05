<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 05/09/16
 * Time: 12:43
 */

namespace Modules\Recipe\Commands;

use Mindy\Console\ConsoleCommand;
use Mindy\Storage\Files\RemoteFile;
use Modules\Recipe\Models\Ingridient;
use Modules\Recipe\Models\Instruction;
use Modules\Recipe\Models\Recipe;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\DomCrawler\Crawler;

class EdaCommand extends ConsoleCommand
{
    public function configure()
    {
        $this->setName('eda');
    }

    public function execute(InputInterface $input, OutputInterface $output)
    {
        $baseUrl = 'http://eda.ru';
        $url = 'http://eda.ru/recepty/zavtraki';

        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET', $url);
        $body = $res->getBody();

        $crawler = new Crawler((string)$body);

        $recipes = $crawler->filter('.b-recipe-widget')->each(function (Crawler $node, $i) use ($baseUrl) {
            if ($i > 2) {
                return;
            }

            $client = new \GuzzleHttp\Client();
            $res = $client->request('GET', $baseUrl . $node->filter('.b-recipe-widget__name a')->attr('href'));
            $pageCrawler = new Crawler((string)$res->getBody());

            $ingridients = $pageCrawler->filter('tr.ingredient')->each(function (Crawler $pageNode) {
                return [
                    'name' => trim($pageNode->filter('td')->first()->text()),
                    'count' => trim($pageNode->filter('td')->last()->text())
                ];
            });

            $instructions = $pageCrawler->filter('.instructions li')->each(function (Crawler $pageNode) {
                $imageSrc = '';
                $image = $pageNode->filter('.s-recipe-step-link img');
                if ($image->count()) {
                    $imageSrc = $image->attr('src');
                }
                $text = trim($pageNode->text());

                if (strpos($text, 'Adf.banner.ssp') !== false) {
                    return;
                }

                return [
                    'text' => $text,
                    'image' => $imageSrc
                ];
            });

            $description = $pageCrawler->filter('.b-recipe__header .description');

            $image = $pageCrawler->filter('.videothumb__thumb-widget img');

            return [
                'image' => $image->count() ? $image->attr('src') : '',
                'title' => trim($pageCrawler->filter('h1.s-recipe-name')->text()),
                'instructions' => $instructions,
                'description' => $description->count() ? trim($description->text()) : '',
                'ingridients' => $ingridients,
                'time' => $pageCrawler->filter('.value-title')->text()
            ];
        });

        foreach ($recipes as $item) {
            if (empty($item['title'])) {
                continue;
            }

            $recipe = new Recipe([
                'name' => $item['title'],
                'time' => $item['time'],
                'image' => empty($item['image']) ? '' : new RemoteFile($item['image']),
                'description' => $item['description'],
                'is_published' => true
            ]);

            if ($recipe->save()) {
                foreach ($item['ingridients'] as $ingridient) {
                    (new Ingridient([
                        'name' => $ingridient['name'],
                        'count' => $ingridient['count'],
                        'recipe' => $recipe
                    ]))->save();
                }

                foreach ($item['instructions'] as $instruction) {
                    if (!empty($instruction['text'])) {
                        (new Instruction([
                            'text' => $instruction['text'],
                            'image' => empty($instruction['image']) ? '' : new RemoteFile($instruction['image']),
                            'recipe' => $recipe
                        ]))->save();
                    }
                }
            }
        }
    }
}