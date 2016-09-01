import { fetch } from 'lib';

export default {
    prefix: 'request',

    create(params = {}) {
        return fetch.post(this.prefix + '/create', {}, params);
    }
};