import c from '../constants';
import { tr } from 'lib';

const initialState = {
    language: window.LANGUAGE,
    translate: window.TRANSLATE
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case c.TRANSLATE_LANGUAGE:
            tr.setLanguage(action.language);
            return {
                ...state,
                language: action.language
            };
        default:
            return state
    }
}
