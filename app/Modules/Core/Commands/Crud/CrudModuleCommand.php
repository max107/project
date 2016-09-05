<?php
/**
 * Created by PhpStorm.
 * User: max
 * Date: 05/09/16
 * Time: 16:27
 */

namespace Modules\Core\Commands\Crud;

use Mindy\Helper\Alias;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class CrudModuleCommand extends CrudCommand
{
    public function configure()
    {
        $this->setName('crud_module');
        $this->addOption('template', '', InputOption::VALUE_REQUIRED, 'Template', 'core/crud/module.template');
        $this->addOption('name', '', InputOption::VALUE_REQUIRED, 'Template', '');
    }

    public function execute(InputInterface $input, OutputInterface $output)
    {
        $template = $input->getOption('template');
        $id = ucfirst($input->getOption('id'));

        $template = $this->renderTemplate($template, [
            'module' => $id
        ]);

        $path = Alias::get('Modules.' . $id);
        if (!is_dir($path)) {
            mkdir($path, 0755, true);
        }

        $this->write($path . DIRECTORY_SEPARATOR . $id . 'Module.php', $template);
    }
}