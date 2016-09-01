import { fetch } from 'lib';

export default {
    prefix: 'worker',

    list(params = {}) {
        return fetch.get(this.prefix + '/list', params);
    }
};