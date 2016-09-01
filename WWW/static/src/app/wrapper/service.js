import { fetch } from 'lib';

export default {
    prefix: 'service',

    view(slug) {
        return fetch.get(this.prefix + '/view', {slug});
    },

    list(params = {}) {
        return fetch.get(this.prefix + '/list', params);
    }
};