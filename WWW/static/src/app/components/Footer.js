import React, { Component } from 'react';
import Paginator from './Paginator';
import svg from './svg';
import { tr } from 'lib';
import TweetList from 'components/TweetList';

export default class Footer extends Component {
    render() {
        /*
        <li className="skype">
            {svg('skype-small')}
            <a href="skype:studio107ru?call">studio107ru</a>
        </li>
        */
        return (
            <div id="footer">
                <div className="row">
                    <div className="columns small-12">
                        <div className="contacts-list-container">
                            <ul className="contacts-list">
                                <li className="mail">
                                    <a href="mailto:mail@studio107.ru">mail@studio107.ru</a>
                                </li>
                                <li className="phone">
                                    <a href="tel:+78332207107">+7 (8332) 207-107</a>
                                </li>
                                <li className="geo">
                                    {tr.t('Moskovskaya street 4/3, 504')}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
