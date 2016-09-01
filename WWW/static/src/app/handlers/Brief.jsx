import React, { Component } from 'react';

export default class Brief extends Component {
    render() {
        var nameValue = '',
            phoneValue = '';
        return (
            <div className="brief-container">
                <div className="row">
                    <div className="columns small-12">
                        <div className="brief-text">
                            <h1>Бриф</h1>
                            <p>Вы также можете скачать оффлайн-версию брифа в <a href="#" target="_blank">PDF</a></p>
                        </div>
                    </div>
                </div>

                <div className="brief-form-container">
                    <form id="brief-form">
                        <div className="row">
                            <div className="columns small-12 medium-4 left-side">
                                <label htmlFor="">Название организации</label>
                            </div>
                            <div className="columns small-12 medium-8 right-side">
                                <input type="text" name=""/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columns small-12 medium-4 left-side">
                                <label htmlFor="">Род деятельности</label>
                            </div>
                            <div className="columns small-12 medium-8 right-side">
                                <input type="text" name=""/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columns small-12 medium-4 left-side">
                                <label htmlFor="">Адрес сайта</label>
                                <span
                                    className="help-text">(укажите адрес имеющегося сайта или планируемые варианты)</span>
                            </div>
                            <div className="columns small-12 medium-8 right-side">
                                <input type="text" name=""/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columns small-12 medium-4 left-side">
                                <p className="left-side-title">Основные задачи проекта</p>
                            </div>
                            <div className="columns small-12 medium-8 right-side">
                                <ul className="small-block-grid-1 medium-block-grid-2 select-list">
                                    <li>
                                        <input type="checkbox" name="q[]" value="1" id="q1"/>
                                        <label htmlFor="q1">
                                            Информирование о товаре/услуге
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="q[]" value="1" id="q2"/>
                                        <label htmlFor="q2">
                                            Обратная связь
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="q[]" value="1" id="q3"/>
                                        <label htmlFor="q3">
                                            Влияние на имидж компании/товара
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="q[]" value="1" id="q4"/>
                                        <label htmlFor="q4">
                                            Стартовое продвижение
                                            компании / продукта / услуги и т.д.
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="q[]" value="1" id="q5"/>
                                        <label htmlFor="q5">Информирование о конкретной рекламной акции</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="q[]" value="1" id="q6"/>
                                        <label htmlFor="q6">Оказание on-line услуг</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="q[]" value="1" id="q7"/>
                                        <label htmlFor="q7">Прием заказов</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="q[]" value="1" id="q8"/>
                                        <label htmlFor="q8">B2B (взаимодействие с дилерами, партнерами)</label>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columns small-12 medium-4 left-side">
                                <p className="left-side-title">Если проводится модернизация имеющегося сайта, укажите ее
                                    причины и цели</p>
                            </div>
                            <div className="columns small-12 medium-8 right-side">
                                <ul className="small-block-grid-1 medium-block-grid-2 select-list">
                                    <li>
                                        <input type="checkbox" name="aq[]" value="1" id="aq1"/>
                                        <label htmlFor="aq1">
                                            Существующий сайт устарел
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="aq[]" value="1" id="aq2"/>
                                        <label htmlFor="aq2">
                                            Необходим новый, уникальный функционал
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="aq[]" value="1" id="aq3"/>
                                        <label htmlFor="aq3">
                                            Обновление в связи с ребрендингом
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="aq[]" value="1" id="aq4"/>
                                        <label htmlFor="aq4">
                                            Необходимо повышение посещаемости
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="aq[]" value="1" id="aq6"/>
                                        <label htmlFor="aq6">Необходимо улучшение общей эргономики сайта</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="aq[]" value="1" id="aq5"/>
                                        <label htmlFor="aq5">Другое</label>
                                    </li>
                                </ul>
                                <div>
                                    <label htmlFor="aq7">Другие причины и цели модернизации</label>
                                    <textarea id="aqq7" name=""/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columns small-12 medium-4 left-side">
                                <label htmlFor="">Целевая аудитория сайта</label>
                                <span className="help-text">(пол, возраст, место жительства, социальный статус, образование, вероисповедание, род занятий, уровень доходов, образ жизни, поведенческие привычки и тд)</span>
                            </div>
                            <div className="columns small-12 medium-8 right-side">
                                <textarea/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columns small-12 medium-4 left-side">
                                <label htmlFor="">Основная особенность вашего сайта</label>
                                <span
                                    className="help-text">(Чем ваш сайт должен будет выделиться среди аналогичных)</span>
                            </div>
                            <div className="columns small-12 medium-8 right-side">
                                <textarea/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columns small-12 medium-4 left-side">
                                <label htmlFor="">Ожидаемая реакция целевой аудитории</label>
                                <span className="help-text">(Какое впечатление должен получить пользователь, какие выводы должен сделать, какое целевое действие должен совершить?)</span>
                            </div>
                            <div className="columns small-12 medium-8 right-side">
                                <textarea/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columns small-12 medium-4 left-side">
                                <label htmlFor="">Конкуренты на рынке</label>
                                <span className="help-text">(Укажите сылки на сайты ваших конкурентов. Опишите их сильные и слабы стороны.)</span>
                            </div>
                            <div className="columns small-12 medium-8 right-side">
                                <textarea/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columns small-12 medium-4 left-side">
                                <label htmlFor="">Примеры сайтов, которые вам <strong>нравятся</strong>:</label>
                                <span className="help-text">(Укажите ссылки на сайты и оставьте комментарии о достоинствах этих сайтов)</span>
                            </div>
                            <div className="columns small-12 medium-8 right-side">
                                <textarea/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columns small-12 medium-4 left-side">
                                <label htmlFor="">Примеры сайтов, которые вам <strong>НЕ нравятся</strong>:</label>
                                <span className="help-text">(Укажите ссылки на сайты и оставьте комментарии о достоинствах этих сайтов)</span>
                            </div>
                            <div className="columns small-12 medium-8 right-side">
                                <textarea/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columns small-12 medium-4 left-side">
                                <p className="left-side-title">Если проводится модернизация имеющегося сайта, укажите ее
                                    причины и цели</p>
                            </div>
                            <div className="columns small-12 medium-8 right-side">
                                <ul className="small-block-grid-2 select-list">
                                    <li>
                                        <input type="checkbox" name="qq[]" value="1" id="qq1"/>
                                        <label htmlFor="qq1">Новостная лента</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="qq[]" value="1" id="qq2"/>
                                        <label htmlFor="qq2">Фотогалерея</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="qq[]" value="1" id="qq3"/>
                                        <label htmlFor="qq3">Видео галерея</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="qq[]" value="1" id="qq4"/>
                                        <label htmlFor="qq4">Вопрос/ответ, FAQ</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="qq[]" value="1" id="qq6"/>
                                        <label htmlFor="qq6">Обратная связь</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="qq[]" value="1" id="qq5"/>
                                        <label htmlFor="qq5">Онлайн-консультант</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="qq[]" value="1" id="qq5"/>
                                        <label htmlFor="qq5">Каталог товаров</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="qq[]" value="1" id="qq5"/>
                                        <label htmlFor="qq5">Онлайн-оплата</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="qq[]" value="1" id="qq5"/>
                                        <label htmlFor="qq5">Форма заказа</label>
                                    </li>

                                    <li>
                                        <input type="checkbox" name="qq[]" value="1" id="qq1"/>
                                        <label htmlFor="qq1">Обратный звонок</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="qq[]" value="1" id="qq1"/>
                                        <label htmlFor="qq1">Блог</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="qq[]" value="1" id="qq1"/>
                                        <label htmlFor="qq1">Коллективный блог</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="qq[]" value="1" id="qq1"/>
                                        <label htmlFor="qq1">Калькулятор/конфигуратор</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="qq[]" value="1" id="qq1"/>
                                        <label htmlFor="qq1">Поиск по сайту</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="qq[]" value="1" id="qq1"/>
                                        <label htmlFor="qq1">Интерактивная карта/план</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="qq[]" value="1" id="qq1"/>
                                        <label htmlFor="qq1">Форум</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="qq[]" value="1" id="qq1"/>
                                        <label htmlFor="qq1">Чат</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="qq[]" value="1" id="qq1"/>
                                        <label htmlFor="qq1">Другое</label>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columns small-12 medium-4 left-side">
                                <label htmlFor="">Примерная структура сайта</label>
                                <span className="help-text">Перечислите название основных разделов, таких как: «О компании», «Новости», «Каталог», «Вакансии»</span>
                            </div>
                            <div className="columns small-12 medium-8 right-side">
                                <textarea/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columns small-12 medium-4 left-side">
                                <p className="left-side-title">Тип оформления и стилистика</p>
                            </div>
                            <div className="columns small-12 medium-8 right-side">
                                <ul className="small-block-grid-1 select-list">
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Строгий (мало графики, упор на подачу информации)</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Минималистичный (минимум текста и графики)</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Презентабельный (минимум текста, упор на графику)</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Сбалансированный (баланс между текстом и графикой)</label>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columns small-12 medium-4 left-side">
                                <p className="left-side-title">Цветовая гамма</p>
                            </div>
                            <div className="columns small-12 medium-8 right-side">
                                <ul className="small-block-grid-1 select-list">
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Светлые тона</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Темные тона</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Цветовое решение согласно фирменному стилю</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Свои цвета</label>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columns small-12 medium-4 left-side">
                                <p className="left-side-title">Элементы фирменного стиля, которые должны применяться в
                                    дизайне сайта</p>
                            </div>
                            <div className="columns small-12 medium-8 right-side">
                                <ul className="small-block-grid-1 select-list">
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Логотип</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Фирменный шрифт</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Фирменные цвета</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Слоган</label>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columns small-12 medium-4 left-side">
                                <p className="left-side-title">Информация, которая должна будет заинтересовать
                                    посетителей в первую очередь</p>
                            </div>
                            <div className="columns small-12 medium-8 right-side">
                                <ul className="small-block-grid-1 select-list">
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Продукция</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Акционные предложения, скидки</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Контактная информация</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Информация о компании</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Другое</label>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columns small-12 medium-4 left-side">
                                <p className="left-side-title">Тип верстки сайта</p>
                            </div>
                            <div className="columns small-12 medium-8 right-side">
                                <ul className="small-block-grid-1 select-list">
                                    <li>
                                        <input type="radio" name="bbq1[]" value="1" id="bbq1"/>
                                        <label htmlFor="bbq1">Фиксированная верстка (~ 980px)</label>
                                        <p className="help-text">Сайт будет выглядеть одинаково на всех устройствах и
                                            разрешениях экрана</p>
                                    </li>
                                    <li>
                                        <input type="radio" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">«Резиновая» верстка</label>
                                        <p className="help-text">Элементы сайта будут растягиваться под разрешение
                                            экрана пользователя. Расположение блоков останется неизменным.</p>
                                    </li>
                                    <li>
                                        <input type="radio" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Адаптивная верстка</label>
                                        <p className="help-text">Более современный и универскальный вариант «резиновой
                                            верстки». Подразумевает под собой разное расположение блоков на разных типах
                                            устройств и разрешениях экрана. Основной упор при такой верстке делается на
                                            мобильные устройства.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columns small-12 medium-4 left-side">
                                <p className="left-side-title">Тип шрифтов, который будет использоваться на сайте</p>
                            </div>
                            <div className="columns small-12 medium-8 right-side">
                                <ul className="small-block-grid-1 select-list">
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Гротеск (шрифт без засечек)</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Антиква (шрифт с засечками)</label>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columns small-12 medium-4 left-side">
                                <p className="left-side-title">Какие материалы вы можете предоставить?</p>
                            </div>
                            <div className="columns small-12 medium-8 right-side">
                                <ul className="small-block-grid-1 select-list">
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Логотип</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Элементы фирменного стиля</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Каталог товаров</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Текст для наполнения</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Фотографии предприятия/офиса/сотрудников</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Фотографии товаров</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="bq[]" value="1" id="bq1"/>
                                        <label htmlFor="bq1">Другое</label>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columns small-12 medium-4 left-side">
                                <label htmlFor="">Прочие пожелания по проекту</label>
                            </div>
                            <div className="columns small-12 medium-8 right-side">
                                <textarea />
                            </div>
                        </div>

                        <div className="row">
                            <div className="columns small-12 medium-4 left-side">
                                <label htmlFor="">Подтверждение</label>
                                <span className="help-text">Укажите имя и номер телефона контактного лица, затем нажмите «Отправить». Мы свяжемся с вами.</span>
                            </div>
                            <div className="columns small-12 medium-8 right-side">
                                <div className="brief-confirm">
                                    <div className="row">
                                        <div className="columns small-12 medium-4">
                                            <input type="text" defaultValue={nameValue}/>
                                        </div>
                                        <div className="columns small-12 medium-4">
                                            <input type="text" defaultValue={phoneValue}/>
                                        </div>
                                        <div className="columns small-12 medium-4">
                                            <input type="submit" value="Отправить"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}