import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class Tweet extends Component {
    static propTypes = {
        tweet: PropTypes.object.isRequired
    };

    render() {
        const { tweet } = this.props;
        let created_at = moment(tweet.created_at).format("D MMMM YYYY");

        return (
            <div className="tweets-item">
                <p className="tweets-item-date">{created_at}</p>
                <p className="tweets-item-content">{tweet.text}</p>
            </div>
        )
    }
}