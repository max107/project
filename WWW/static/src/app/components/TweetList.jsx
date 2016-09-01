import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { tr } from 'lib';
import Tweet from 'containers/Tweet';
import Paginator from 'components/Paginator';
import { tweet as actions } from 'actions';

class TweetList extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        objects: PropTypes.array.isRequired,
        language: PropTypes.string.isRequired
    };

    render() {
        const { objects, language } = this.props;

        let tweetUrl = "https://twitter.com/studio107" + language,
            tweetNodes = objects.slice(0, 1).map((tweet, i) => <Tweet key={i} tweet={tweet}/>);

        return (
            <div className="row tweets-container">
                <div className="columns large-2">
                    <a target="_blank" href={tweetUrl} className="twitter"></a>
                </div>
                <div className="columns large-10">
                    {tweetNodes}
                </div>
            </div>
        );
    }
}

export default connect(state => {
    const { language } = state.translate;
    return {
        ...state.tweet,
        language
    }
}, dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
})(TweetList);