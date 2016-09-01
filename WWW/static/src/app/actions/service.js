import service from '../wrapper/service';
import c from 'constants';

let noop = () => {
};

function receive(data) {
    return {
        type: c.SERVICE_RECEIVE,
        loading: false,
        didInvalidate: false,
        ...data
    }
}

function loading(value) {
    return {
        type: c.SERVICE_LOADING,
        loading: value
    }
}

function error(data) {
    return {
        type: c.SERVICE_ERROR,
        loading: false,
        error: true
    }
}

function invalidate() {
    return {
        type: c.SERVICE_INVALIDATE,
        didInvalidate: true
    }
}

function viewInvalidate(id) {
    return {
        type: c.SERVICE_VIEW_INVALIDATE,
        id
    }
}

export function shouldFetchList(state) {
    const { objects, loading, didInvalidate } = state.service;
    if (objects.length === 0) {
        return true;
    }
    if (loading) {
        return false;
    }
    return didInvalidate;
}

export function fetchListIfNeeded(cb = noop) {
    return (dispatch, getState) => {
        if (shouldFetchList(getState())) {
            return dispatch(fetchList(cb));
        }
    }
}

export function didInvalidate() {
    return (dispatch) => {
        return dispatch(invalidate());
    }
}

export function fetchList(cb) {
    return dispatch => {
        dispatch(loading(true));

        return service.list()
            .then(data => {
                dispatch(receive(data));
                cb(data);
            });
    };
}

function viewReceive(slug, data) {
    return {
        type: c.SERVICE_VIEW_RECEIVE,
        loading: false,
        error: false,
        slug,
        ...data
    }
}

function viewLoading(value) {
    return {
        type: c.SERVICE_VIEW_LOADING,
        loading: value
    }
}

function viewError(data) {
    return {
        type: c.SERVICE_VIEW_ERROR,
        loading: false,
        error: true
    }
}

export function fetchView(slug) {
    return dispatch => {
        dispatch(viewLoading(true));

        return service.view(slug)
            .then(data => dispatch(viewReceive(slug, data)));
    };
}

export function shouldFetchView(state, slug) {
    const { view } = state.service;
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