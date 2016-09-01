import React, { Component } from 'react';
import { Link } from 'react-easy-router';
import Map from 'components/Map';
import serialize from 'serialize-form';
import { tr } from 'lib';
import RequestForm from 'components/RequestForm';

export default class Contacts extends Component {
    render() {
        var onlineBrief = false ? <Link to="Brief" className="button">{tr.t('Fill brief online')}</Link> : null;

        return (
            <div className="contacts-container">
                <div className="row">
                    <div className="columns small-6">
                        <h1>Контакты</h1>
                        <div className="contacts-content">
                            <p>Время работы: Понедельник-Пятница с 10.00 до 18.00</p>
                            <p>Телефон: <a href="tel:+78332207107">+7 (8332) 207-107</a></p>
                            <p>Эл. почта: <a href="mailto:mail@studio107.ru">mail@studio107.ru</a></p>
                            <p>Skype: <a href="skype:studio107.ru?chat">studio107.ru</a></p>
                            <p>Адрес: Киров, Московская д. 4/3, оф. 504</p>
                        </div>
                        <div className="contacts-brief">
                            <p>
                                Бриф — это небольшая анкета, которая поможет нам более четко понять цели и задачи вашего
                                будущего проекта. После того, как вы ответите на все поставленные в брифе вопросы, мы
                                сможем сформировать для вас идеальное ценовое решение.
                            </p>
                            <p>
                                <a href="/brief-download" className="button">Скачать бриф</a>
                                <a href="#" className="button button__white">Заказать обратный звонок</a>
                                {onlineBrief}
                            </p>
                        </div>
                    </div>
                    <div className="columns small-6">
                        <Map />
                    </div>
                </div>
                <div className="row">
                    <div className="columns small-12">
                        <hr/>
                        <h2>Напишите нам</h2>
                        <RequestForm />
                    </div>
                </div>
            </div>
        );
    }
}
