import c from 'constants';

export function setLanguage(language) {
    return dispatch => dispatch({
        type: c.TRANSLATE_LANGUAGE,
        language
    });
}