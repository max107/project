import c from '../constants';

const initialState = {
    loading: false,
    objects: []
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case c.TYPE_ERROR:
            return {
                ...state,
                error: action.error
            };
        case c.TYPE_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        case c.TYPE_RECEIVE:
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
