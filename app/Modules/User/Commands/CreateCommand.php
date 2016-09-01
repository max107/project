<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 01/09/16
 * Time: 17:21
 */

namespace Modules\User\Commands;

use function Mindy\app;
use Mindy\Console\ConsoleCommand;
use Mindy\QueryBuilder\Q\QOr;
use Mindy\Validation\EmailValidator;
use Modules\User\Helpers\UserHelper;
use Modules\User\Models\User;
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
        $this->addOption('notify', '', InputOption::VALUE_OPTIONAL, 'Send user notification email?', true);
    }

    public function execute(InputInterface $input, OutputInterface $output)
    {
        $notify = $input->getOption('notify');

        $email = $input->getOption('email');

        if (!empty($email)) {
            $emailValidator = new EmailValidator(true);
            if (!$emailValidator->validate($email)) {
                $output->writeln("Incorrect email address");
                return;
            }
        }

        $attrs = [
            'username' => $input->getOption('username'),
            'email' => $email,
        ];

        $helper = $this->getHelper('question');

        $activate = new ConfirmationQuestion('Activate user account? (Y/n): ', false);
        $attrs['is_active'] = $helper->ask($input, $output, $activate);

        $superuser = new ConfirmationQuestion('User is superuser? (Y/n): ', false);
        $attrs['is_superuser'] = $helper->ask($input, $output, $superuser);

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

        $attrs['password'] = $password;

        $has = User::objects()
                ->filter(new QOr([
                    ['username' => $attrs['username']],
                    ['email' => $attrs['email']]
                ]))->count() > 0;

        if ($has === false) {
            if ($attrs['is_superuser']) {
                $model = UserHelper::createSuperUser($attrs);
            } else {
                $model = UserHelper::createUser($attrs, $notify);
            }

            if (is_array($model)) {
                $output->writeln(implode("\n", $model));
            } else {
                $output->writeln("Created");
            }
            return;
        } else {
            $output->writeln("User already exists");
            return;
        }
    }
}