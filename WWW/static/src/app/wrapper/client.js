import { fetch } from 'lib';

export default {
    prefix: 'client',

    list(params = {}) {
        return fetch.get(this.prefix + '/list', params);
    }
};