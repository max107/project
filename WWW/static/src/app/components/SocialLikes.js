import React, { Component } from 'react';
import $ from 'jquery';

export default class SocialLikes extends Component {
    componentDidMount() {
        //$(this.refs.container).socialLikes();
    }

    render() {
        return (
            <div ref="container" className="social-likes" data-counters="no">
                <div className="vkontakte" title="Поделиться ссылкой во Вконтакте"></div>
                <div className="facebook" title="Поделиться ссылкой на Фейсбуке"></div>
                <div className="twitter" title="Поделиться ссылкой в Твиттере"></div>
                <div className="odnoklassniki" title="Поделиться ссылкой в Одноклассниках"></div>
                <p className="clear"></p>
            </div>
        );
    }
};
