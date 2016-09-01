import $ from 'jquery';
import 'expose?tr!./lib/tr';
import moment from 'moment';
moment.locale('ru');
moment.createFromInputFallback = (config) => {
    config._d = new Date(config._i);
};

$(() => {
    setTimeout(() => {
        $('body').addClass('done');
    }, 600);
    
    $(document)
        .on('mouseenter', '.animation-flip', function (e) {
            $(this).addClass('on');
        })
        .on('mouseleave', '.animation-flip', function (e) {
            var $this = $(this);
            setTimeout(function () {
                $this.removeClass('on');
            }, 400);
        });
});

import React from 'react';
import { render } from 'react-dom'
import routes from 'routes';
import { Router } from 'react-easy-router';
import { createHistory } from 'history'
import store from 'store';
import { Provider } from 'react-redux';
import NotFound from 'handlers/NotFound';

let historyCallback = () => {
    //window.scrollTo(0, 0);
    $('html, body').animate({scrollTop: 0}, 'fast');
};
const history = createHistory();

const container = (
    <Provider store={store}>
        <Router history={history} historyCallback={historyCallback} notFound={NotFound} routes={routes}/>
    </Provider>
);

render(container, document.getElementById('app'));