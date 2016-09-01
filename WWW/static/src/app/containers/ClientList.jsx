import React, { Component, PropTypes } from 'react';
import Client from './Client';

export default class ClientList extends Component {
    static propTypes = {
        objects: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
        limit: PropTypes.number
    };

    static defaultProps = {
        limit: 0
    };

    render() {
        const { objects, limit } = this.props;

        let clientNodes = (limit ? objects.slice(0, limit) : objects).map((client, i) => {
            return <li key={i}><Client client={client} /></li>;
        });

        return (
            <ul className="clients-list small-block-grid-2 medium-block-grid-4 large-block-grid-5">
                {clientNodes}
            </ul>
        );
    }
}