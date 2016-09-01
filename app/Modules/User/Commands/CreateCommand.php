<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 01/09/16
 * Time: 17:21
 */

namespace Modules\User\Commands;

use Mindy\Console\ConsoleCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\ConfirmationQuestion;
use Symfony\Component\Console\Question\Question;

class CreateCommand extends ConsoleCommand
{
    public function configure()
    {
        $this->setName('create');
        $this->addOption('username', '-u', InputOption::VALUE_REQUIRED, 'Username', '');
        $this->addOption('email', '-e', InputOption::VALUE_OPTIONAL, 'Email', '');
    }

    public function execute(InputInterface $input, OutputInterface $output)
    {
        $attrs = [
            'username' => $input->getOption('username'),
            'email' => $input->getOption('email'),
        ];

        $helper = $this->getHelper('question');
        $activate = new ConfirmationQuestion('Activate user account? (Y/n): ', false);
        $attrs['is_active'] = $helper->ask($input, $output, $activate);

        $helper = $this->getHelper('question');
        $attrs['is_superuser'] = new ConfirmationQuestion('User is superuser? (Y/n): ', false);

        $question = new Question('Password: ');
        $question->setHidden(true);
        $question->setHiddenFallback(false);
        $password = $helper->ask($input, $output, $question);

        $question = new Question('Password repeat: ');
        $question->setHidden(true);
        $question->setHiddenFallback(false);
        $passwordRepeat = $helper->ask($input, $output, $question);

        if ($password === $passwordRepeat) {
            $attrs['password'] = $password;
        }
    }
}