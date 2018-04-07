"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const Observable_1 = require("rxjs/Observable");
class rxios {
    constructor(options = {}) {
        this.options = options;
        this._httpClient = axios_1.default.create(options);
    }
    _makeRequest(method, url, config, body) {
        let request;
        switch (method) {
            case 'GET':
                request = this._httpClient.get(url, config);
                break;
            case 'POST':
                request = this._httpClient.post(url, body, config);
                break;
            case 'PUT':
                request = this._httpClient.put(url, body, config);
                break;
            case 'PATCH':
                request = this._httpClient.patch(url, body, config);
                break;
            case 'DELETE':
                request = this._httpClient.delete(url, config);
                break;
            default:
                throw new Error('Method not supported');
        }
        return new Observable_1.Observable(subscriber => {
            request.then(response => {
                subscriber.next(response);
                subscriber.complete();
            }).catch((err) => {
                subscriber.error(err.response);
                subscriber.complete();
            });
        });
    }
    get(url, config) {
        return this._makeRequest('GET', url, config);
    }
    post(url, body, config) {
        return this._makeRequest('POST', url, config, body);
    }
    put(url, body, config) {
        return this._makeRequest('PUT', url, config, body);
    }
    patch(url, body, config) {
        return this._makeRequest('PATCH', url, config, body);
    }
    delete(url, config) {
        return this._makeRequest('DELETE', url, config);
    }
}
exports.rxios = rxios;
exports.Rxios = rxios;
//# sourceMappingURL=index.js.map