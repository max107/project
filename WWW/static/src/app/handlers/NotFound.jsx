import React, { Component } from 'react';
import { Link } from 'react-easy-router';
import App from 'app';
import PageHeader from 'containers/PageHeader';
import { tr } from 'lib';

export default class NotFound extends Component {
    render() {
        return (
            <App>
                <PageHeader>
                    <h1>{tr.t('Page not found')}</h1>
                    <p><Link className="button" to="Home">{tr.t('Go to index page')}</Link></p>
                </PageHeader>
            </App>
        );
    }
}