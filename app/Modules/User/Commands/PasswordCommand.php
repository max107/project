<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 01/09/16
 * Time: 17:21
 */

namespace Modules\User\Commands;

use Mindy\Console\ConsoleCommand;
use Modules\User\Models\User;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\Question;

class PasswordCommand extends ConsoleCommand
{
    public function configure()
    {
        $this->setName('password');
        $this->addOption('username', '-u', InputOption::VALUE_REQUIRED, 'Username', '');
    }

    public function execute(InputInterface $input, OutputInterface $output)
    {
        $username = $input->getOption('username');

        /** @var \Modules\User\Models\UserBase $user */
        $user = User::objects()->get(['username' => $username]);
        if ($user === null) {
            $output->writeln('User not found');
            return;
        }

        $helper = $this->getHelper('question');

        $question = (new Question('Password: '))
            ->setHidden(true)
            ->setHiddenFallback(false);
        $password = $helper->ask($input, $output, $question);

        $question = (new Question('Password repeat: '))
            ->setHidden(true)
            ->setHiddenFallback(false);
        $passwordRepeat = $helper->ask($input, $output, $question);

        if ($password !== $passwordRepeat) {
            $output->writeln('Incorrect password');
            return;
        }

        if (empty($hashType)) {
            $hashType = $user->hash_type;
        } else if (!empty($hashType) && $user->hash_type != $hashType) {
            $user->hash_type = $hashType;
            $user->save(['hash_type']);
        }
        $updated = $user->changePassword($password, $hashType);
        $output->writeln($updated ? "Password updated" : "Failed update password");
    }
}