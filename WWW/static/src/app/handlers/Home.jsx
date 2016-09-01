import React, { Component } from 'react';
import ClientList from 'components/ClientList';
import PortfolioList from 'components/PortfolioList';
import { Link } from 'react-easy-router';
import svg from 'components/svg';

export default class Home extends Component {
    render() {
        return (
            <div className="index-container">
                <div className="index-main-container">
                    <div className="row">
                        <div className="columns small-4">
                            <div className="index-main-image">
                                {svg('icon-devices')}
                            </div>
                        </div>
                        <div className="columns small-8">
                            <div className="index-main-content">
                                Предлагаем услуги по разработке и обслуживанию сайта для вашей компании. Команда
                                профессионалов готова реализовать продукт любой сложности, способный четко решать именно
                                ваши бизнес-задачи. Мы не используем “шаблонный” подход. Каждый созданный нами проект
                                обладает уникальным дизайном и логикой, которая полностью подстроена под бизнес
                                заказчика.
                            </div>
                            <div className="index-main-project">
                                Разработано более <span className="index-main-project__count">300 проектов</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="index-service-container">
                    <div className="row">
                        <div className="columns small-12">
                            <ul className="small-block-grid-1 medium-block-grid-1 large-block-grid-3">
                                <li>
                                    <div className="index-service-item">
                                        <div className="index-service-icon">
                                            {svg('icon-design')}
                                        </div>
                                        <p className="index-service-title">Дизайн</p>
                                        <p className="index-service-content">
                                            Хороший дизайн должен с первых секунд заинтересовать потенциального
                                            клиента и расположить его к себе.
                                        </p>
                                        <p className="index-service-button">
                                            <a href="#" className="button">Подробнее</a>
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="index-service-item">
                                        <div className="index-service-icon">
                                            {svg('icon-mobile')}
                                        </div>
                                        <p className="index-service-title">Мобильные приложения</p>
                                        <p className="index-service-content">
                                            Это стремительно развивающееся направление и современному бизнесу
                                            необходимо поспевать за клиентами предоставляя качественную и удобную
                                            платформу для своих услуг или продажи своих товаров.
                                        </p>
                                        <p className="index-service-button">
                                            <a href="#" className="button">Подробнее</a>
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="index-service-item">
                                        <div className="index-service-icon">
                                            {svg('icon-develop')}
                                        </div>
                                        <p className="index-service-title">Разработка сайта</p>
                                        <p className="index-service-content">
                                            Основным направлением нашей деятельности является создание сайтов
                                            различных направлений и сложности.
                                        </p>
                                        <p className="index-service-button">
                                            <a href="#" className="button">Подробнее</a>
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="index-portfolio-container">
                    <div className="row">
                        <div className="columns small-12">
                            <p className="main-title">Наши работы</p>
                            <PortfolioList limit={8}/>
                            <p className="text-center">
                                <Link to="PortfolioList" className="button">Смотреть все</Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="index-clients-container">
                    <div className="row">
                        <div className="columns small-12">
                            <p className="main-title">Наши клиенты</p>
                            <ClientList limit={10}/>
                            <p className="text-center">
                                <Link to="ClientList" className="button">Смотреть все</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}