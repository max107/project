<?php

namespace Modules\Core\Commands;

use Mindy\Base\Mindy;
use Mindy\Console\ConsoleCommand;
use Mindy\Helper\Console;
use Mindy\Orm\Sync;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

/**
 *
 *
 * All rights reserved.
 *
 * @author Falaleev Maxim
 * @email max@studio107.ru
 * @version 1.0
 * @company Studio107
 * @site http://studio107.ru
 * @date 28/04/14.04.2014 17:53
 */
class SyncCommand extends ConsoleCommand
{
    public function configure()
    {
        $this->setName('sync');
        $this->addOption('module', '-m', InputOption::VALUE_OPTIONAL, 'Module name', null);
        $this->addOption('connection', '-c', InputOption::VALUE_OPTIONAL, 'Connection name', null);
    }

    protected function getModels(OutputInterface $output, $module = null)
    {
        $app = Mindy::app();
        $models = [];
        if ($module === null) {
            $modules = $app->getModules();
            foreach ($modules as $name => $config) {
                /** @var \Mindy\Base\Module $module */
                $module = $app->getModule($name);
                $tmp = $module->getModels();
                $models = array_merge($models, $tmp);
                $output->writeln($module->getId() . ': ' . count($tmp));
            }
        } else {
            if ($app->hasModule($module)) {
                $module = $app->getModule($module);
                $models = $module->getModels();
                $output->writeln($module->getId() . ': ' . count($models));
            } else {
                $output->writeln("Module not found or not enabled");
                exit(1);
            }
        }

        return array_values($models);
    }

    public function execute(InputInterface $input, OutputInterface $output)
    {
        $module = $input->getOption('module');
        $connection = $input->getOption('connection');

        $models = $this->getModels($output, $module);
        $connection = Mindy::app()->db->getDb($connection);
        $sync = new Sync($models, $connection);
        $created = $sync->create();

        $output->writeln('Sync: ' . $created);
    }
}
