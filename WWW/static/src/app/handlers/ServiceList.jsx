import React, { Component } from 'react';
import { Link } from 'react-easy-router';
import { tr } from 'lib';
import PortfolioList from 'components/PortfolioList';
import PageHeader from 'containers/PageHeader';

export default class ServiceList extends Component {
    render() {
        return (
            <div className="services-container">
                <div className="row">
                    <div className="columns small-12">
                        <h1 className="main-title">Услуги</h1>
                        <p className="heading-text">
                            Основное направление нашей деятельности — дизайн и разработка сайтов различной сложности. Мы
                            прорабатываем внешний вид и работоспособность наших продуктов на экранах различных
                            разрешений, планшетах, смартфонах. Кроме того, мы предоставляем другие услуги в смежных
                            областях.
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="columns small-12">
                        <ul className="small-block-grid-1 medium-block-grid-2 large-block-grid-3 services-list">
                            <li className="service-list-item">
                                <div className="service-info">
                                    <div className="head">
                                        <div className="head-left">
                                            <Link to="ServiceView" params={{url: "web-development"}} className="image svg-icon-code"></Link>
                                        </div>
                                        <div className="head-right">
                                            <Link to="ServiceView" params={{url: "web-development"}} className="service-link">{tr.t('Web development')}</Link>
                                        </div>
                                    </div>
                                    <ul className="service-items">
                                        <li className="service-item">{tr.t('Web applications')}</li>
                                        <li className="service-item">{tr.t('Websites of any type')}</li>
                                        <li className="service-item">{tr.t('Website enhancement')}</li>
                                    </ul>
                                    <p><Link to="ServiceView" params={{url: "web-development"}} className="button">{tr.t('Read more')}</Link></p>
                                </div>
                            </li>
                            <li className="service-list-item">
                                <div className="service-info">
                                    <div className="head">
                                        <div className="head-left">
                                            <Link to="ServiceView" params={{url: "design"}} className="image svg-icon-design"></Link>
                                        </div>
                                        <div className="head-right">
                                            <Link to="ServiceView" params={{url: "design"}} className="service-link">{tr.t('Design')}</Link>
                                        </div>
                                    </div>
                                    <ul className="service-items">
                                        <li className="service-item">{tr.t('Branding')}</li>
                                        <li className="service-item">{tr.t('Identity')}</li>
                                        <li className="service-item">{tr.t('Graphic design')}</li>
                                    </ul>
                                    <p><Link to="ServiceView" params={{url: "design"}} className="button">{tr.t('Read more')}</Link></p>
                                </div>
                            </li>
                            <li className="service-list-item">
                                <div className="service-info">
                                    <div className="head">
                                        <div className="head-left">
                                            <Link to="ServiceView" params={{url: "support"}} className="image svg-icon-f1"></Link>
                                        </div>
                                        <div className="head-right">
                                            <Link to="ServiceView" params={{url: "support"}} className="service-link">{tr.t('Outsourcing')}</Link>
                                        </div>
                                    </div>
                                    <ul className="service-items">
                                        <li className="service-item">{tr.t('Graphic design')}</li>
                                        <li className="service-item">{tr.t('Creating content')}</li>
                                        <li className="service-item">{tr.t('Upgrades & optimization')}</li>
                                    </ul>
                                    <p><Link to="ServiceView" params={{url: "support"}} className="button">{tr.t('Read more')}</Link></p>
                                </div>
                            </li>
                            <li className="service-list-item">
                                <div className="service-info">
                                    <div className="head">
                                        <div className="head-left">
                                            <Link to="ServiceView" params={{url: "mobile"}} className="image svg-icon-mobile"></Link>
                                        </div>
                                        <div className="head-right">
                                            <Link to="ServiceView" params={{url: "mobile"}} className="service-link multiline">{tr.t('Mobile applications')}</Link>
                                        </div>
                                    </div>
                                    <ul className="service-items">
                                        <li className="service-item">{tr.t('iOS applications development')}</li>
                                        <li className="service-item">{tr.t('Android applications development')}</li>
                                        <li className="service-item">{tr.t('WP8 applications development')}</li>
                                    </ul>
                                    <p><Link to="ServiceView" params={{url: "mobile"}} className="button">{tr.t('Read more')}</Link></p>
                                </div>
                            </li>
                            <li className="service-list-item">
                                <div className="service-info">
                                    <div className="head">
                                        <div className="head-left">
                                            <Link to="ServiceView" params={{url: "content"}} className="image img-icon-text"></Link>
                                        </div>
                                        <div className="head-right">
                                            <Link to="ServiceView" params={{url: "content"}} className="service-link multiline">{tr.t('Content management')}</Link>
                                        </div>
                                    </div>
                                    <ul className="service-items">
                                        <li className="service-item">{tr.t('Creating unique articles')}</li>
                                        <li className="service-item">{tr.t('Writing news, blogging')}</li>
                                        <li className="service-item">{tr.t('Keyword research')}</li>
                                    </ul>
                                    <p><Link to="ServiceView" params={{url: "content"}} className="button">{tr.t('Read more')}</Link></p>
                                </div>
                            </li>
                            <li className="service-list-item">
                                <div className="service-info">
                                    <div className="head">
                                        <div className="head-left">
                                            <Link to="ServiceView" params={{url: "other"}} className="image img-icon-star"></Link>
                                        </div>
                                        <div className="head-right">
                                            <Link to="ServiceView" params={{url: "other"}} className="service-link multiline">{tr.t('Additional services')}</Link>
                                        </div>
                                    </div>
                                    <ul className="service-items">
                                        <li className="service-item">{tr.t('Website audit')}</li>
                                        <li className="service-item">{tr.t('Desktop app development')}</li>
                                    </ul>
                                    <p><Link to="ServiceView" params={{url: "other"}} className="button">{tr.t('Read more')}</Link></p>
                                </div>
                            </li>
                        </ul>

                        <p className="main-title">Наши работы</p>
                        <PortfolioList limit={4} random={true} />
                        <p className="text-center">
                            <Link to="PortfolioList" className="button show-portfolio">{tr.t('See portfolio')} &rarr;</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
