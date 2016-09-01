import tweet from '../wrapper/tweet';
import c from 'constants';

let noop = () => {
};

function receive(data) {
    return {
        type: c.TWEET_RECEIVE,
        loading: false,
        didInvalidate: false,
        ...data
    }
}

function loading(value) {
    return {
        type: c.TWEET_LOADING,
        loading: value
    }
}

function error(data) {
    return {
        type: c.TWEET_ERROR,
        loading: false,
        error: true
    }
}

function invalidate() {
    return {
        type: c.TWEET_INVALIDATE,
        didInvalidate: true
    }
}

export function shouldFetchList(state, params = {}) {
    const { objects, loading, didInvalidate } = state.tweet;
    if (objects.length === 0) {
        return true;
    }
    if (loading) {
        return false;
    }
    return didInvalidate;
}

export function fetchListIfNeeded(params = {}) {
    return (dispatch, getState) => {
        if (shouldFetchList(getState(), params)) {
            return dispatch(fetchList(params));
        }
    }
}

export function didInvalidate() {
    return (dispatch) => {
        return dispatch(invalidate());
    }
}

export function fetchList(params) {
    return dispatch => {
        dispatch(loading(true));

        return tweet.list(params)
            .then(data => dispatch(receive(data)));
    };
}