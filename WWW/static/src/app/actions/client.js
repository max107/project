import client from '../wrapper/client';
import c from 'constants';

let noop = () => {
};

function receive(data) {
    return {
        type: c.CLIENT_RECEIVE,
        loading: false,
        didInvalidate: false,
        ...data
    }
}

function loading(value) {
    return {
        type: c.CLIENT_LOADING,
        loading: value
    }
}

function error(data) {
    return {
        type: c.CLIENT_ERROR,
        loading: false,
        error: true
    }
}

function invalidate() {
    return {
        type: c.CLIENT_INVALIDATE,
        didInvalidate: true
    }
}

function viewInvalidate(id) {
    return {
        type: c.CLIENT_VIEW_INVALIDATE,
        id
    }
}

export function shouldFetchList(state, params = {}) {
    const { objects, loading, didInvalidate } = state.client;
    if (objects.length === 0) {
        return true;
    }
    if (loading) {
        return false;
    }
    return didInvalidate;
}

export function fetchListIfNeeded(params = {}) {
    return (dispatch, getState) => {
        if (shouldFetchList(getState(), params)) {
            return dispatch(fetchList(params));
        }
    }
}

export function didInvalidate() {
    return (dispatch) => {
        return dispatch(invalidate());
    }
}

export function fetchList(params) {
    return dispatch => {
        dispatch(loading(true));

        return client.list(params)
            .then(data => dispatch(receive(data)));
    };
}

function viewReceive(id, data) {
    return {
        type: c.CLIENT_VIEW_RECEIVE,
        loading: false,
        error: false,
        id,
        ...data
    }
}

function viewLoading(value) {
    return {
        type: c.CLIENT_VIEW_LOADING,
        loading: value
    }
}

function viewError(data) {
    return {
        type: c.CLIENT_VIEW_ERROR,
        loading: false,
        error: true
    }
}

export function fetchView(id) {
    return dispatch => {
        dispatch(viewLoading(true));

        return client.view(id)
            .then(data => dispatch(viewReceive(id, data)));
    };
}

export function shouldFetchView(state, id) {
    const { view } = state.news;
    if (id in view.view) {
        return false;
    }
    return view.loading === false;
}


export function fetchViewIfNeeded(id) {
    return (dispatch, getState) => {
        if (shouldFetchView(getState(), id)) {
            return dispatch(fetchView(id));
        }
    }
}