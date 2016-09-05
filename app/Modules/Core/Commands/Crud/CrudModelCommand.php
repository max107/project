<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 05/09/16
 * Time: 16:29
 */

namespace Modules\Core\Commands\Crud;

use Mindy\Helper\Alias;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class CrudModelCommand extends CrudCommand
{
    public function configure()
    {
        $this->setName('crud_model');
        $this->addOption('template', '-t', InputOption::VALUE_REQUIRED, 'Template', 'core/crud/model.template');
        $this->addOption('id', '-i', InputOption::VALUE_REQUIRED, 'Module id', '');
        $this->addOption('name', '-n', InputOption::VALUE_REQUIRED, 'Model name', '');
    }

    public function execute(InputInterface $input, OutputInterface $output)
    {
        $module = ucfirst($input->getOption('id'));
        $name = ucfirst($input->getOption('name'));
        $template = $this->renderTemplate($input->getOption('template'), [
            'module' => $module,
            'name' => $name
        ]);

        $path = Alias::get('Modules.' . $module . '.Models');
        if (!is_dir($path)) {
            mkdir($path, 0755, true);
        }

        $this->write($path . DIRECTORY_SEPARATOR . $name . '.php', $template);
    }
}