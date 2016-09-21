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
            'd' => 'd',
            'dump' => 'dump',
            'debug' => 'debug',
            't' => function ($domain, $message, array $parameters = [], $locale = null) : string {
                return app()->t($domain, $message, $parameters, $locale);
            },
            'param' => ['\Modules\Core\Components\ParamsHelper', 'get'],
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