import c from '../constants';

const initialState = {
    loading: false,
    objects: []
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case c.WORKER_ERROR:
            return {
                ...state,
                error: action.error
            };
        case c.WORKER_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        case c.WORKER_RECEIVE:
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
