import c from '../constants';

const initialState = {
    meta: {},
    view: {
        view: window.SERVICES,
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
        case c.SERVICE_INVALIDATE:
            return {
                ...state,
                didInvalidate: action.didInvalidate
            };
        case c.SERVICE_ERROR:
            return {
                ...state,
                error: action.error
            };
        case c.SERVICE_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        case c.SERVICE_RECEIVE:
            return {
                ...state,
                didInvalidate: action.didInvalidate,
                objects: action.objects,
                meta: action.meta,
                loading: action.loading
            };

        case c.SERVICE_VIEW_ERROR:
            return {
                ...state,
                view: {...view, error: action.error}
            };
        case c.SERVICE_VIEW_LOADING:
            return {
                ...state,
                view: {...view, loading: action.loading}
            };
        case c.SERVICE_VIEW_RECEIVE:
            let { error, loading, slug, service } = action;
            return {
                ...state,
                view: {
                    view: {...view.view, [slug]: service},
                    error,
                    loading
                }
            };
        case c.SERVICE_VIEW_INVALIDATE:
            delete view.view[action.id];
            return {
                ...state,
                view: view
            };
        default:
            return state
    }
}
