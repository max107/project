import slide from '../wrapper/slide';
import c from 'constants';

function receive(data) {
    return {
        type: c.CLIENT_RECEIVE,
        loading: false,
        ...data
    }
}

function loading(value) {
    return {
        type: c.CLIENT_LOADING,
        loading: value
    }
}

export function shouldFetchList(state, params = {}) {
    const { objects, loading } = state.slide;
    return objects.length == 0 || !loading;

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

        return slide.list(params)
            .then(data => dispatch(receive(data)));
    };
}
