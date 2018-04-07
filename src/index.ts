import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios';
import { Observable } from 'rxjs/Observable';

export interface rxiosConfig extends AxiosRequestConfig {
  localCache?: boolean;
}

class rxios {
  private _httpClient: AxiosInstance;

  constructor(private options: rxiosConfig = {}) {
    this._httpClient = axios.create(options);
  }

  private _makeRequest<T>(method: string, url: string, config?: object, body?: object) {
    let request: AxiosPromise<T>;
    switch (method) {
      case 'GET':
        request = this._httpClient.get<T>(url, config);
        break;
      case 'POST':
        request = this._httpClient.post<T>(url, body, config);
        break;
      case 'PUT':
        request = this._httpClient.put<T>(url, body, config);
        break;
      case 'PATCH':
        request = this._httpClient.patch<T>(url, body, config);
        break;
      case 'DELETE':
        request = this._httpClient.delete(url, config);
        break;

      default:
        throw new Error('Method not supported');
    }
    return new Observable<T>(subscriber => {
      request.then(response => {
        subscriber.next(response);
        subscriber.complete();
      }).catch((err: Error) => {
        subscriber.error(err.response);
        subscriber.complete();
      });
    });
  }

  public get<T>(url: string, config?: object) {
    return this._makeRequest<T>('GET', url, config);
  }

  public post<T>(url: string, body: object, config?: object) {
    return this._makeRequest<T>('POST', url, config, body);
  }

  public put<T>(url: string, body: object, config?: object) {
    return this._makeRequest<T>('PUT', url, config, body);
  }

  public patch<T>(url: string, body: object, config?: object) {
    return this._makeRequest<T>('PATCH', url, config, body);
  }

  public delete(url: string, config?: object) {
    return this._makeRequest('DELETE', url, config);
  }
}

export {rxios, rxios as Rxios};
