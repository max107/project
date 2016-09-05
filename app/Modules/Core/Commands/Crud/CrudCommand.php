<?php

/**
 * User: max
 * Date: 10/09/15
 * Time: 21:34
 */

namespace Modules\Core\Commands\Crud;

use Exception;
use Mindy\Console\ConsoleCommand;
use Mindy\Helper\Alias;
use Mindy\Helper\Traits\RenderTrait;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

abstract class CrudCommand extends ConsoleCommand
{
    use RenderTrait;

    protected function write($path, $content)
    {
        if ((file_put_contents($path, $content) >= 0) == false) {
            throw new Exception("Failed to write " . basename($path));
        }
    }
}
