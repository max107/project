import React, { Component, PropTypes } from 'react';
import PageHeader from 'containers/PageHeader';
import PortfolioList from 'components/PortfolioList';
import RequestForm from 'components/RequestForm';
import { tr } from 'lib';

export default class Support extends Component {
    render() {
        return (
            <div>
                <PageHeader>
                    <h1>Техническая поддержка</h1>
                    <p>Мы оказываем услуги по технической поддержке сайтов и мобильных приложений различной
                        сложности.</p>
                    <p>Разрабатываем новые компоненты, обновляем и поддерживаем в актуальном состоянии исходный код
                        проекта, разрабатываем новые графические элементы, пишем статьи и занимаемся наполнением проектов.</p>
                </PageHeader>

                <div className="row">
                    <div className="columns small-12">
                        <p className="title-separator">
                            <span>{tr.t('Feedback')}</span>
                        </p>
                        <RequestForm placeholder="Добрый день. Наша компания хотела бы воспользоваться вашими услугами технической поддержки." />

                        <p className="title-separator">
                            <span>Проекты на технической поддержке</span>
                        </p>
                        <PortfolioList is_support={true}/>
                    </div>
                </div>
            </div>
        )
    }
}
