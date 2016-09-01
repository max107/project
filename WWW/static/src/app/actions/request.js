import request from '../wrapper/request';
import c from 'constants';

let noop = () => {
};

function formLoading(value) {
    return {
        type: c.REQUEST_FORM_LOADING,
        loading: value
    }
}

function formReceive(data) {
    return {
        type: c.REQUEST_FORM_RECEIVE,
        errors: data.errors,
        loading: false
    }
}

function formClearErrors() {
    return {
        type: c.REQUEST_FORM_CLEAR_ERRORS,
        errors: {},
        loading: false
    }
}

function invalidate() {
    return {
        type: c.REQUEST_INVALIDATE,
        didInvalidate: true
    }
}

export function create(params, callback = noop) {
    return dispatch => {
        dispatch(formLoading(true));

        return request.create(params)
            .then(data => {
                dispatch(formReceive(data));

                if (data.status) {
                    dispatch(formClearErrors());
                    dispatch(invalidate());
                    callback(data);
                }
            }).catch(() => {
                dispatch(formClearErrors());
            });
    };
}