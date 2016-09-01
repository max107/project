import portfolio from '../wrapper/portfolio';
import c from 'constants';

let noop = () => {
};

function receive(data) {
    return {
        type: c.PORTFOLIO_RECEIVE,
        loading: false,
        didInvalidate: false,
        ...data
    }
}

function loading(value) {
    return {
        type: c.PORTFOLIO_LOADING,
        loading: value
    }
}

function error(data) {
    return {
        type: c.PORTFOLIO_ERROR,
        loading: false,
        error: true
    }
}

function invalidate() {
    return {
        type: c.PORTFOLIO_INVALIDATE,
        didInvalidate: true
    }
}

function viewInvalidate(id) {
    return {
        type: c.PORTFOLIO_VIEW_INVALIDATE,
        id
    }
}

export function shouldFetchList(state, params) {
    const { objects, loading, didInvalidate } = state.portfolio;
    if (objects.length === 0) {
        return true;
    }
    if (loading) {
        return false;
    }
    return didInvalidate;
}

export function fetchListIfNeeded(params, cb = noop) {
    return (dispatch, getState) => {
        if (shouldFetchList(getState(), params)) {
            return dispatch(fetchList(params, cb));
        }
    }
}

export function didInvalidate() {
    return (dispatch) => {
        return dispatch(invalidate());
    }
}

export function fetchList(params, cb) {
    return dispatch => {
        dispatch(loading(true));

        return portfolio.list(params)
            .then(data => {
                dispatch(receive(data));
                cb(data);
            });
    };
}

function viewReceive(slug, data) {
    return {
        type: c.PORTFOLIO_VIEW_RECEIVE,
        loading: false,
        error: false,
        slug,
        ...data
    }
}

function viewLoading(value) {
    return {
        type: c.PORTFOLIO_VIEW_LOADING,
        loading: value
    }
}

function viewError(data) {
    return {
        type: c.PORTFOLIO_VIEW_ERROR,
        loading: false,
        error: true
    }
}

export function fetchView(slug) {
    return dispatch => {
        dispatch(viewLoading(true));

        return portfolio.view(slug)
            .then(data => dispatch(viewReceive(slug, data)));
    };
}

export function shouldFetchView(state, slug) {
    const { view } = state.portfolio;
    if (slug in view.view) {
        return false;
    }
    return view.loading === false;
}


export function fetchViewIfNeeded(slug) {
    return (dispatch, getState) => {
        if (shouldFetchView(getState(), slug)) {
            return dispatch(fetchView(slug));
        }
    }
}