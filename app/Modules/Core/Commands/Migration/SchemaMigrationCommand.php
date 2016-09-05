<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 05/09/16
 * Time: 16:36
 */

namespace Modules\Core\Commands\Migration;

use function Mindy\app;
use Mindy\Console\ConsoleCommand;
use Mindy\Helper\Alias;
use Mindy\Helper\Traits\RenderTrait;
use Mindy\Orm\Migration;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class SchemaMigrationCommand extends ConsoleCommand
{
    use RenderTrait;

    public function configure()
    {
        $this->setName('schema_migration');
        $this->addOption('module', '', InputOption::VALUE_REQUIRED, 'Module id', '');
        $this->addOption('model', '', InputOption::VALUE_REQUIRED, 'Model class', '');
        $this->addOption('db', '', InputOption::VALUE_OPTIONAL, 'Database component id', '');
        $this->addOption('auto', '', InputOption::VALUE_OPTIONAL, 'Auto migration', true);
    }

    public function execute(InputInterface $input, OutputInterface $output)
    {
        // $module, $model = null, $auto = true, $db = null
        $module = ucfirst($input->getOption('module'));
        $model = $input->getOption('model');
        $db = $input->getOption('db');
        $auto = $input->getOption('auto');

        $className = strtr("\\Modules\\{module}\\Models\\{model}", [
            '{module}' => $module,
            '{model}' => $model,
        ]);

        if (class_exists($className) === false) {
            $output->writeln("Model not found in namespace: " . $className);
            return;
        }

        $models = [new $className];

        $path = Alias::get('Modules.' . $module . '.Migrations');
        if (!is_dir($path)) {
            mkdir($path);
        }

        foreach ($models as $model) {
            $migration = new Migration($model, $path);
            $migration->setDb($db);

            if ($migration->hasChanges() == false) {
                $output->writeln("Error: " . $migration->getName() . ". No changes.");
                return;
            }

            $namespace = strtr("Modules\\{module}\\Migrations", [
                '{module}' => ucfirst($module)
            ]);

            if ($auto) {
                $safeUp = $migration->getSafeUp();
                $safeDown = $migration->getSafeDown();
            } else {
                $safeUp = '';
                $safeDown = '';
            }

            if ($migration->save()) {
                // TODO $db
                $fileName = $path . DIRECTORY_SEPARATOR . $migration->getName();
                $source = self::renderTemplate('core/migration/migrate.template', [
                    'namespace' => $namespace,
                    'name' => $migration->getName(),
                    'safeUp' => $safeUp,
                    'safeDown' => $safeDown,
                    'db' => $db
                ]);
                file_put_contents($fileName . '.php', $source);

                /*
                list(, $timestamp) = explode('_', $migration->getName());
                $model = new ModelMigration;
                $sync = new Sync($model, app()->db->getDb($db));
                if ($sync->hasTable($model)) {
                    $sync->create();
                }
                */

                $output->writeln("Migration created: " . $migration->getName());
            } else {
                $output->writeln("Failed to save migration: " . $migration->getName() . ". No changes.");
            }
        }
    }
}