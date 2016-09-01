import { fetch } from 'lib';

export default {
    prefix: 'slide',

    list(params = {}) {
        return fetch.get(this.prefix + '/list', params);
    }
};