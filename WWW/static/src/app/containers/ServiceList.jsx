import React, { Component } from 'react';
import { Link } from 'react-easy-router';
import { tr } from 'lib';
import Service from './Service';

export default class IndexServices extends Component {
    render() {
        const services = [
            {
                icon: 'code', url: 'web-development', title: tr.t('Web development'),
                text: tr.t('We develop modern and beautiful websites of any complexity. From personal web pages to huge corporate portals and services.')
            },
            {
                icon: 'design', url: 'design', title: tr.t('Design'),
                text: tr.t('We create unique design of any type: from branding and identity to graphic design and user interface design.')
            },
            {
                icon: 'f1', url: 'support', title: tr.t('Outsourcing'),
                text: tr.t('We provide complex website support after development including technical and content improvements.')
            },
            {
                icon: 'mobile', url: 'mobile', title: tr.t('Mobile applications'),
                text: tr.t('We develop modern and quality applications for smarphones and tablets on iOS, Android, WP8.')
            }
        ];

        let serviceNodes = services.map((item, i) => <li key={i}><Service {...item}/></li>);

        return (
            <div className="service-block">
                <div className="row">
                    <div className="columns small-12">
                        <p className="title-separator">
                            <Link className="transparent-link" to="ServiceList">{tr.t('Services')}</Link>
                        </p>
                        <ul className="service-block-list small-block-grid-1 medium-block-grid-2">
                            {serviceNodes}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
