<?php

/**
 * All rights reserved.
 *
 * @author Falaleev Maxim
 * @email max@studio107.ru
 * @version 1.0
 * @company Studio107
 * @site http://studio107.ru
 * @date 08/01/15 16:23
 */

namespace Modules\Core\Commands\Migration;

use Mindy\Base\Mindy;
use Mindy\Console\ConsoleCommand;
use Mindy\Helper\Alias;
use Mindy\Orm\Migration;
use Mindy\Orm\Sync;
use Mindy\Helper\Traits\RenderTrait;
use Modules\Core\Models\Migration as ModelMigration;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class MigrationCommand extends ConsoleCommand
{
    use RenderTrait;

    public function configure()
    {
        $this->setName('migration');
        $this->addOption('module', '', InputOption::VALUE_REQUIRED, 'Module id', '');
        $this->addOption('model', '', InputOption::VALUE_REQUIRED, 'Model class', '');
        $this->addOption('db', '', InputOption::VALUE_OPTIONAL, 'Database component id', '');
        $this->addOption('name', '', InputOption::VALUE_OPTIONAL, 'Name', '');
    }

    protected function isToUpMigration($module, $model, $fileName = '', $db = null)
    {
        if (empty($fileName)) {
            return true;
        } else {
            if (strpos($fileName, '_') === false) {
                echo "Name must be a full. Example: Test_123123123." . PHP_EOL;
                die(1);
            }
            list(, $timestamp) = explode('_', $fileName);
            $model = ModelMigration::objects()->using($db)->last()->get([
                'module' => $module,
                'model' => $model
            ]);
            if ($model !== null && $model->timestamp >= $timestamp) {
                return false;
            }

            return true;
        }
    }

    public function execute(InputInterface $input, OutputInterface $output)
    {
        $module = ucfirst($input->getOption('module'));
        $model = ucfirst($input->getOption('model'));
        $name = $input->getOption('name');
        $db = $input->getOption('db');

        $className = strtr("\\Modules\\{module}\\Models\\{model}", [
            '{module}' => ucfirst($module),
            '{model}' => ucfirst($model)
        ]);

        if (class_exists($className) === false) {
            $output->writeln("Model not found in namespace: " . $className);
            return;
        }

        $models = [new $className];

        $path = Alias::get('Modules.' . ucfirst($module) . '.Migrations');
        if (!is_dir($path)) {
            echo "Migrations not found" . PHP_EOL;
            die(1);
        }

        $isUp = $this->isToUpMigration($module, $model, $name, $db);

        foreach ($models as $modelInstance) {
            $migration = new Migration($modelInstance, $path);

            $migrationModel = ModelMigration::objects()->last()->get([
                'module' => ucfirst($module),
                'model' => get_class($modelInstance)
            ]);

            $migrations = $migration->getMigrations();
            if (!$isUp) {
                rsort($migrations);
            }
            foreach ($migrations as $migrationFile) {
                $fileName = basename($migrationFile);
                list($name, $timestamp) = explode('_', str_replace('.json', '', $fileName));

                if ($migrationModel) {
                    if ($isUp && $migrationModel->timestamp >= $timestamp) {
                        continue;
                    } else if ($migrationModel->timestamp > $timestamp) {
                        continue;
                    }
                }

                $migrationClassName = strtr("\\Modules\\{module}\\Migrations\\{migration}", [
                    '{module}' => ucfirst($module),
                    '{migration}' => str_replace('.json', '', $fileName)
                ]);

                include_once($path . DIRECTORY_SEPARATOR . str_replace('.json', '', $fileName) . '.php');

                /** @var $migrationInstance \Mindy\Query\Migration */
                $migrationInstance = new $migrationClassName;
                echo "Process: " . str_replace('.json', '', $fileName) . PHP_EOL;

                if ($isUp) {
                    $migrationInstance->up();

                    ModelMigration::objects()->create([
                        'module' => ucfirst($module),
                        'model' => get_class($modelInstance),
                        'timestamp' => $timestamp
                    ]);
                } else {
                    $migrationInstance->down();

                    ModelMigration::objects()->delete([
                        'module' => ucfirst($module),
                        'model' => get_class($modelInstance),
                        'timestamp' => $timestamp
                    ]);
                }

                if (!empty($name) && $fileName == $name) {
                    break;
                }
            }
            $output->writeln("Complete");
        }
    }
}
