import type from '../wrapper/type';
import c from 'constants';

function receive(data) {
    return {
        type: c.TYPE_RECEIVE,
        loading: false,
        didInvalidate: false,
        ...data
    }
}

function loading(value) {
    return {
        type: c.TYPE_LOADING,
        loading: value
    }
}

function invalidate() {
    return {
        type: c.TYPE_INVALIDATE,
        didInvalidate: true
    }
}

export function shouldFetchList(state, params = {}) {
    const { objects, loading } = state.type;
    if (objects.length > 0) {
        return false;
    }
    return objects.length == 0 && !loading;
}

export function fetchListIfNeeded(params = {}) {
    return (dispatch, getState) => {
        if (shouldFetchList(getState(), params)) {
            return dispatch(fetchList(params));
        }
    }
}

export function fetchList(params) {
    return dispatch => {
        dispatch(loading(true));

        return type.list(params)
            .then(data => dispatch(receive(data)));
    };
}
