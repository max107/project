import c from '../constants';

const initialState = {
    loading: false,
    errors: {}
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case c.REQUEST_FORM_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        case c.REQUEST_FORM_RECEIVE:
            return {
                ...state,
                errors: action.errors,
                loading: action.loading
            };
        case c.REQUEST_FORM_CLEAR_ERRORS:
            return {
                ...state,
                errors: {},
                loading: action.loading
            };
        default:
            return state
    }
}
