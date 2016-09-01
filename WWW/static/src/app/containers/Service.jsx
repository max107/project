import React, { Component, PropTypes } from 'react';
import { Link } from 'react-easy-router';
import { tr } from 'lib';

export default class Service extends Component {
    static propTypes = {
        icon: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    };

    render() {
        const { icon, url, title, text } = this.props;
        return (
            <div>
                <i className={"svg-icon-" + icon}/>
                <div className="service-block-text">
                    <h3>
                        <Link className="transparent-link" to="ServiceView" params={{url: url}}>{title}</Link>
                    </h3>
                    <p>{text}</p>
                    <p><Link className="button transparent-link" to="ServiceView" params={{url: url}}>{tr.t('Read more')}</Link></p>
                </div>
            </div>
        );
    }
}