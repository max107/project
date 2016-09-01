import year from '../wrapper/year';
import c from 'constants';

function receive(data) {
    return {
        type: c.YEAR_RECEIVE,
        loading: false,
        didInvalidate: false,
        ...data
    }
}

function loading(value) {
    return {
        type: c.YEAR_LOADING,
        loading: value
    }
}

function invalidate() {
    return {
        type: c.YEAR_INVALIDATE,
        didInvalidate: true
    }
}

export function shouldFetchList(state) {
    const { objects, loading } = state.year;
    if (objects.length === 0) {
        return false;
    }
    return !!loading;
}

export function fetchListIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchList(getState())) {
            return dispatch(fetchList());
        }
    }
}

export function fetchList() {
    return dispatch => {
        dispatch(loading(true));

        return year.list()
            .then(data => dispatch(receive(data)));
    };
}
