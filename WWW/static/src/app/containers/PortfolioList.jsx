import React, { Component, PropTypes } from 'react';
import PortfolioItem from './PortfolioItem';
import { shuffle } from 'lib';

export default class PortfolioList extends Component {
    static propTypes = {
        objects: PropTypes.array.isRequired,
        limit: PropTypes.number,
        random: PropTypes.bool
    };

    render() {
        const { objects, random, limit } = this.props;

        let newObjects = [...objects];
        if (random) {
            newObjects = shuffle(newObjects);
        }
        if (limit) {
            newObjects = newObjects.slice(0, limit);
        }

        let portfolioNodes = newObjects.map((portfolio, i) => {
            return <PortfolioItem key={i} portfolio={portfolio} />;
        });

        return (
            <ul className="small-block-grid-1 medium-block-grid-4 portfolio-list">
                {portfolioNodes}
            </ul>
        )
    }
}