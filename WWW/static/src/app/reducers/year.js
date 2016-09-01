import c from '../constants';
import _ from 'lodash';

const initialState = {
    loading: false,
    objects: _.range(2010, new Date().getFullYear() + 1).reverse()
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case c.YEAR_ERROR:
            return {
                ...state,
                error: action.error
            };
        case c.YEAR_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        case c.YEAR_RECEIVE:
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
