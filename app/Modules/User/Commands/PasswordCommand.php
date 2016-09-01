<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 01/09/16
 * Time: 17:21
 */

namespace Modules\User\Commands;

use Mindy\Console\ConsoleCommand;

class PasswordCommand extends ConsoleCommand
{
    public function configure()
    {
        $this->setName('password');
    }
}