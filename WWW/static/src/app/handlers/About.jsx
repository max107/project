import React, { Component } from 'react';
import $ from 'jquery';
import ClientList from 'components/ClientList';
import { Link } from 'react-easy-router';
import Workers from 'components/Workers';
import Paginator from 'components/Paginator';
import { tr } from 'lib';
import chunk from 'lodash.chunk';
import PageHeader from 'containers/PageHeader';

export default class About extends Component {
    state = {
        cls: true
    };

    handleMouseEnter(e) {
        this.setState({
            cls: true
        });
    }

    handleMouseLeave(e) {
        setTimeout(() => {
            this.setState({
                cls: false
            });
        }, 400);
    }

    render() {
        const { cls } = this.state;

        let url = "mailto:mail@studio107.ru?subject=+1 Хочу к вам в команду!&body=Добрый день.%0A%0AМеня зовут ??? и я занимаюсь ???.%0AОпыт работы ??? лет.%0A%0AСсылка на мое портфолио / github: ???.%0A%0AЯ хотел бы присоединиться к вашей студии, открыты ли у вас вакансии?",
            extra = (
                <li className="comeon">
                    <p className={cls ? "animation-flip on" : "animation-flip"}
                       onMouseEnter={this.handleMouseEnter.bind(this)}
                       onMouseLeave={this.handleMouseLeave.bind(this)}>
                        <a href={url}>
                            <img className="normal" src="/static/dist/images/font/about/quest1x.jpg" alt=""/>
                            <img className="hover" src="/static/dist/images/font/about/plus1x.jpg" alt=""/>
                        </a>
                    </p>
                    <p>{tr.t('Ready to join?')}</p>
                    <p><a href={url}>{tr.t('Contact us!')}</a></p>
                    <p className="clear"/>
                </li>
            );

        return (
            <div className="about-container">
                <PageHeader>
                    <h1>{tr.t('About')}</h1>
                    <p>{tr.t('Studio 107 was founded in 2010. The main area of our activity is web development. Nevertheless, we are ready to start a site design, an interface design or a mobile application development. Experience, a close-knit team and technologies make us able to perform a task of any complexity.')}                                </p>
                </PageHeader>
                <div className="row">
                    <div className="columns small-12">
                        <p className="title-separator">
                            <span>{tr.t('Our team')}</span>
                        </p>
                        <div className="team-container about" id="team">
                            <Workers extra={extra}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="columns small-12">
                        <div className="about-clients-container">
                            <p className="title-separator">
                                <Link to="ClientList">{tr.t('Our clients')}</Link>
                            </p>
                            <ClientList limit={8}/>
                            <p className="text-center">
                                <Link to="ClientList" className="button">{tr.t('Our clients')} &rarr;</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
