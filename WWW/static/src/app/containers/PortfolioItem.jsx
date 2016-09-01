import React, { Component, PropTypes } from 'react';
import { Link } from 'react-easy-router';
import { tr } from 'lib';

export default class PortfolioItem extends Component {
    static propTypes = {
        portfolio: PropTypes.object.isRequired
    };

    render() {
        /**
         * <img className="lazy" src={model.image.thumb} data-blank-src="/static/dist/images/main/blank.png" />
         * <img className="lazy retina" src={model.image.thumb_retina} data-blank-src="/static/dist/images/main/blank.png" />
         */
        const { portfolio } = this.props;
        return (
            <li className="portfolio-item">
                <div className="portfolio-item-inner">
                    <Link to="PortfolioView" params={{slug: portfolio.slug}} className="portfolio-item-inner-img">
                        <img className="lazy" src={portfolio.image.original}
                             data-blank-src="/static/dist/images/main/blank.png"/>
                        <img className="lazy retina" src={portfolio.image.original}
                             data-blank-src="/static/dist/images/main/blank.png"/>
                    </Link>
                    <Link to="PortfolioView" params={{slug: portfolio.slug}} className="portfolio-item-inner-name">
                        {tr.ta(portfolio, 'name')}
                    </Link>
                    <p className="portfolio-item-inner-group">{tr.ta(portfolio.group, 'name')}</p>
                </div>
            </li>
        );
    }
}
