import { fetch } from 'lib';

export default {
    prefix: 'portfolio',

    view(slug) {
        return fetch.get(this.prefix + '/view', {slug});
    },

    list(params = {}) {
        return fetch.get(this.prefix + '/list', params);
    }
};