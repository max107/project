<?php

namespace Modules\Mail;

use Mindy\Base\Module;

class MailModule extends Module
{
    /**
     * used for queues
     * @var string
     */
    public $domain = 'example.com';
    /**
     * @var bool
     */
    public $delayedSend = false;
    /**
     * used for queues
     * @var string
     */
    public $from = 'admin@example.com';

    public function getVersion()
    {
        return 1.0;
    }

    public function getMenu()
    {
        return [
            'name' => $this->getName(),
            'items' => [
                [
                    'name' => self::t('Mail templates'),
                    'adminClass' => 'MailTemplateAdmin',
                ],
                [
                    'name' => self::t('Mail'),
                    'adminClass' => 'MailAdmin',
                ],
                [
                    'name' => self::t('Queue'),
                    'adminClass' => 'QueueAdmin',
                ],
                [
                    'name' => self::t('Subscribes'),
                    'adminClass' => 'SubscribeAdmin',
                ],
                [
                    'name' => self::t('Url checker'),
                    'adminClass' => 'UrlCheckerAdmin',
                ],
            ]
        ];
    }

    public function getAdminMenu()
    {
        return [
            [
                'url' => $this->reverse('admin:action', [
                    'action' => 'list',
                    'admin' => 'MailTemplateAdmin',
                    'module' => $this->getId()
                ]),
                'name' => self::t('Mail templates'),
                'icon' => 'admin/icons/template.svg'
            ],
            [
                'url' => $this->reverse('admin:action', [
                    'action' => 'list',
                    'admin' => 'MailAdmin',
                    'module' => $this->getId()
                ]),
                'name' => self::t('Mail'),
                'icon' => 'admin/icons/mail.svg'
            ],
            [
                'url' => $this->reverse('admin:action', [
                    'action' => 'list',
                    'admin' => 'QueueAdmin',
                    'module' => $this->getId()
                ]),
                'name' => self::t('Queue'),
                'icon' => 'admin/icons/mail_queue.svg'
            ]
        ];
    }
}
