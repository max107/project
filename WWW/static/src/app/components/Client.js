import React, { Component, PropTypes } from 'react';
import { tr } from 'lib';

export default class Client extends Component {
    static propTypes = {
        client: PropTypes.object.isRequired
    };

    render() {
        const { client } = this.props;

        return (
            <div>
                <img src={'/media/' + client.image} alt={tr.ta(client, 'name')}/>
            </div>
        )
    }
}