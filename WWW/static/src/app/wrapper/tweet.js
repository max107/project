import { fetch } from 'lib';

export default {
    prefix: 'tweet',

    list(params = {}) {
        return fetch.get(this.prefix + '/list', params);
    }
};