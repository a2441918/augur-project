import axios from 'axios';

class BaseService {
    constructor() {
        this._axios = axios.create();
    }

    /**
     * Http get request
     *
     * @param url - request url.  Can be relative or set to explicit domain
     * @param conf - optional http header configuration
     * @returns {*} - promise
     */
    get = (url, conf) => {
        let config = conf || {};
        return this._axios.get(url, config);
    };
}

export default BaseService;