import React, { Component } from 'react';
import { Link } from 'react-easy-router';

export default () => {
    let logo = (
        <Link to="Home" itemProp="url" href="/" title="Студия 107" className="title">
            <span itemProp="name">Студия 107</span>
        </Link>
    );

    if (window.location.pathname == '/') {
        logo = <span itemProp="name" className="logo-span">Студия 107</span>;
    }

    return (
        <h1 className="logo" itemScope="" itemType="http://data-vocabulary.org/Organization">
            {logo}
            <span className="rotate-holder logo-holder">
                <i className="img-icon-logo rotate-front mobile"/>
                <i className="img-icon-home rotate-hover mobile"/>
            </span>
        </h1>
    );
}