import c from '../constants';

const initialState = {
    loading: false,
    objects: window.CLIENTS_ALL
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case c.CLIENT_ERROR:
            return {
                ...state,
                error: action.error
            };
        case c.CLIENT_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        case c.CLIENT_RECEIVE:
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
