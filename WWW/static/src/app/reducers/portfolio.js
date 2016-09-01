import c from '../constants';

const initialState = {
    meta: {},
    view: {
        view: {},
        loading: false,
        error: false
    },
    loading: false,
    objects: [],
    didInvalidate: false
};

export default (state = initialState, action = {}) => {
    let { view } = state;

    switch (action.type) {
        case c.PORTFOLIO_INVALIDATE:
            return {
                ...state,
                didInvalidate: action.didInvalidate
            };
        case c.PORTFOLIO_ERROR:
            return {
                ...state,
                error: action.error
            };
        case c.PORTFOLIO_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        case c.PORTFOLIO_RECEIVE:
            return {
                ...state,
                didInvalidate: action.didInvalidate,
                objects: action.objects,
                meta: action.meta,
                loading: action.loading
            };

        case c.PORTFOLIO_VIEW_ERROR:
            return {
                ...state,
                view: {...view, error: action.error}
            };
        case c.PORTFOLIO_VIEW_LOADING:
            return {
                ...state,
                view: {...view, loading: action.loading}
            };
        case c.PORTFOLIO_VIEW_RECEIVE:
            let { error, loading, slug, portfolio } = action;
            return {
                ...state,
                view: {
                    view: {...view.view, [slug]: portfolio},
                    error,
                    loading
                }
            };
        case c.PORTFOLIO_VIEW_INVALIDATE:
            delete view.view[action.id];
            return {
                ...state,
                view: view
            };
        default:
            return state
    }
}
