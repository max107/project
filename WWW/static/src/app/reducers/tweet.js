import c from '../constants';

const initialState = {
    loading: false,
    objects: window.TWEETS
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case c.TWEET_ERROR:
            return {
                ...state,
                error: action.error
            };
        case c.TWEET_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        case c.TWEET_RECEIVE:
            return {
                ...state,
                objects: action.objects,
                meta: action.meta,
                loading: action.loading
            };
        default:
            return state
    }
}
