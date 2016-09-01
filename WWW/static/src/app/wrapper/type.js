import { fetch } from 'lib';

export default {
    prefix: 'type',

    list(params = {}) {
        return fetch.get(this.prefix + '/list', params);
    }
};