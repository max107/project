<?php
/**
 * Author: Falaleev Maxim
 * Email: max@studio107.ru
 * Company: http://en.studio107.ru
 * Date: 18/02/16
 * Time: 12:26
 */

namespace Modules\Core\Library;

use function Mindy\app;
use Mindy\Base\Mindy;
use Mindy\Helper\Alias;
use Mindy\Helper\Json;
use Mindy\Template\Expression\ArrayExpression;
use Mindy\Template\Library;
use Mindy\Template\Token;

class CoreLibrary extends Library
{
    /**
     * @return array
     */
    public function getHelpers()
    {
        return [
            'basename' => 'basename',
            'strtok' => 'strtok',
            'locale' => function () {
                return app()->locale;
            },
            'locale_date' => function ($timestamp, $format = 'd MMMM yyyy') {
                return app()->locale->getDateFormatter()->format($format, $timestamp);
            },
            'method_exists' => function ($obj, $name) {
                return method_exists($obj, $name);
            },
            'd' => 'd',
            'is_file' => 'is_file',
            'time' => 'time',
            'strtotime' => 'strtotime',
            't' => function ($text, $category, $params = []) {
                if ($category !== 'app' && !strpos($category, '.')) {
                    $category .= '.main';
                }
                $findCategory = explode('.', $category);
                $moduleNameRaw = ucfirst($findCategory[0]);
                if (Mindy::app()->hasModule($moduleNameRaw)) {
                    $module = Mindy::app()->getModule($moduleNameRaw);
                    $moduleName = get_class($module) . '.' . $findCategory[1];
                    return Mindy::t($moduleName, $text, $params);
                } else {
                    return $text;
                }
            },
            'get_static_version' => function () {
                $filePath = Alias::get('www.static') . '/package.json';
                $content = file_get_contents($filePath);
                $data = Json::decode($content);
                return $data['version'];
            },
            'base64_encode' => 'base64_encode',
            'base64_decode' => 'base64_decode',
            'ucfirst' => ['\Mindy\Helper\Text', 'mbUcfirst'],
            'param' => ['\Modules\Core\Components\ParamsHelper', 'get'],
            'humanizeDateTime' => ['\Modules\Core\Components\Humanize', 'humanizeDateTime'],
            'humanizeSize' => ['\Modules\Core\Components\Humanize', 'humanizeSize'],
            'humanizePrice' => ['\Modules\Core\Components\Humanize', 'numToStr'],
            'limit' => ['\Mindy\Helper\Text', 'limit'],
        ];
    }

    /**
     * @return array
     */
    public function getTags()
    {
        return [
            'image' => 'parseImage',
            'url' => 'parseUrl',
            'csrf_token' => 'parseCsrfToken',
        ];
    }

    public function parseCsrfToken($token)
    {
        $this->stream->expect(Token::BLOCK_END);
        return new CsrfTokenNode($token->getLine());
    }

    public function parseUrl($token)
    {
        $name = null;
        $params = array();
        $route = $this->parser->parseExpression();
        while (
            (
                $this->stream->test(Token::NAME) ||
                $this->stream->test(Token::NUMBER) ||
                $this->stream->test(Token::STRING)
            ) && !$this->stream->test(Token::BLOCK_END)
        ) {

            if ($this->stream->consume(Token::NAME, 'with')) {
                $this->stream->expect(Token::OPERATOR, '[');
                $params = $this->parser->parseArrayExpression();
                $this->stream->expect(Token::OPERATOR, ']');
            } else if ($this->stream->test(Token::NAME) && $this->stream->look()->test(Token::OPERATOR, '=')) {
                $key = $this->parser->parseName()->getValue();
                $this->stream->next();
                $params[$key] = $this->parser->parseExpression();
            } else if ($this->stream->test(Token::NAME, 'as')) {
                $this->stream->next();
                $name = $this->parser->parseName()->getValue();
            } else if ($this->stream->test(Token::NAME)) {
                $expression = $this->parser->parseExpression();
                if ($expression instanceof ArrayExpression) {
                    $params = $expression;
                    break;
                } else {
                    $params[] = $expression;
                }
            } else {
                $params[] = $this->parser->parseExpression();
            }
        }

        $this->stream->expect(Token::BLOCK_END);
        return new UrlNode($token->getLine(), $route, $params, $name);
    }

    public function parseImage($token)
    {
        $name = null;
        $params = [];
        $imageUrl = $this->parser->parseExpression();
        while (
            (
                $this->stream->test(Token::NAME) ||
                $this->stream->test(Token::NUMBER) ||
                $this->stream->test(Token::STRING)
            ) && !$this->stream->test(Token::BLOCK_END)
        ) {

            if ($this->stream->consume(Token::NAME, 'with')) {
                $this->stream->expect(Token::OPERATOR, '[');
                $params = $this->parser->parseArrayExpression();
                $this->stream->expect(Token::OPERATOR, ']');
            } else if ($this->stream->test(Token::NAME) && $this->stream->look()->test(Token::OPERATOR, '=')) {
                $key = $this->parser->parseName()->getValue();
                $this->stream->next();
                $params[$key] = $this->parser->parseExpression();
            } else if ($this->stream->test(Token::NAME, 'as')) {
                $this->stream->next();
                $name = $this->parser->parseName()->getValue();
            } else if ($this->stream->test(Token::NAME)) {
                $expression = $this->parser->parseExpression();
                if ($expression instanceof ArrayExpression) {
                    $params = $expression;
                    break;
                } else {
                    $params[] = $expression;
                }
            } else {
                $params[] = $this->parser->parseExpression();
            }
        }

        $this->stream->expect(Token::BLOCK_END);
        return new ImageNode($token->getLine(), $imageUrl, $params, $name);
    }
}