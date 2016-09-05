<?php
/**
 * Author: Falaleev Maxim
 * Email: max@studio107.ru
 * Company: http://en.studio107.ru
 * Date: 18/02/16
 * Time: 11:38
 */

namespace Modules\UserActions\Commands;

use DateTime;
use Mindy\Console\ConsoleCommand;
use Modules\Core\Components\ParamsHelper;
use Modules\UserActions\Models\UserLog;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class UserActionCommand extends ConsoleCommand
{
    public function configure()
    {
        $this->setName('user_action');
    }

    public function execute(InputInterface $input, OutputInterface $output)
    {
        $days = (int)ParamsHelper::get('UserActions.UserLog.count');
        $count = UserLog::objects()->filter([
            'created_at__gte' => new DateTime('+' . $days . ' days')
        ])->delete();

        $output->writeln('Removed ' . $count . ' records');
    }
}