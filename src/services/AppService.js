import BaseService from './BaseService';
import {URL_CONST} from '../constants/constants';

class AppService extends BaseService {

    constructor() {
        super();

        this.API = {
            URL_CONST: URL_CONST
        };
    }

    calculateAverage = (token) => {
        return super.get(`${this.API.URL_CONST}/${token}/stats/average`);
    };

    calculateMedian = (token) => {
        return super.get(`${this.API.URL_CONST}/${token}/stats/median`);
    };

    calculateMostActive = (token) => {
        return super.get(`${this.API.URL_CONST}/${token}/stats/mostActive`);
    };

    calculateRichest(token) {
        return super.get(`${this.API.URL_CONST}/${token}/stats/richest`);
    };
}

export default AppService;