import React, { Component, PropTypes } from 'react';
import Worker from './Worker';

export default class PortfolioWorkers extends Component {
    static propTypes = {
        objects: PropTypes.array.isRequired
    };

    static defaultProps = {
        extra: null
    };

    render() {
        const { objects, extra } = this.props;

        let workerNodes = objects.map((worker, i) => <Worker key={i} worker={worker}/>);

        return (
            <ul className="team-list">
                {workerNodes}
                {extra}
            </ul>
        );
    }
}
