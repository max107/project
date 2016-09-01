import { fetch } from 'lib';

export default {
    prefix: 'year',

    list(params = {}) {
        return fetch.get(this.prefix + '/list', params);
    }
};