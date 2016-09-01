import React, { Component, PropTypes } from 'react';

export default class Client extends Component {
    static propTypes = {
        client: PropTypes.object.isRequired
    };

    render() {
        const { client } = this.props;
        return <img src={client.image.thumb} alt={client.name}/>;
    }
};