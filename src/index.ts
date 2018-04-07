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

  private _makeRequest<T>(method: string, url: string, queryParams?: object, body?: object) {
    let request: AxiosPromise<T>;
    switch (method) {
      case 'GET':
        request = this._httpClient.get<T>(url, {params: queryParams});
        break;
      case 'POST':
        request = this._httpClient.post<T>(url, body, {params: queryParams});
        break;
      case 'PUT':
        request = this._httpClient.put<T>(url, body, {params: queryParams});
        break;
      case 'PATCH':
        request = this._httpClient.patch<T>(url, body, {params: queryParams});
        break;
      case 'DELETE':
        request = this._httpClient.delete(url, {params: queryParams});
        break;
    
      default:
        throw new Error('Method not supported');
    }
    return new Observable<T>(subscriber => {
      request.then(response => {
        subscriber.next(response);
        subscriber.complete();
      }).catch((err: Error) => {
        subscriber.error(err);
        subscriber.complete();
      });
    });
  }

  public get<T>(url: string, queryParams?: object) {
    return this._makeRequest<T>('GET', url, queryParams);
  }

  public post<T>(url: string, body: object, queryParams?: object) {
    return this._makeRequest<T>('POST', url, queryParams, body);
  }
  
  public put<T>(url: string, body: object, queryParams?: object) {
    return this._makeRequest<T>('PUT', url, queryParams, body);
  }

  public patch<T>(url: string, body: object, queryParams?: object) {
    return this._makeRequest<T>('PATCH', url, queryParams, body);
  }
  
  public delete(url: string, queryParams?: object) {
    return this._makeRequest('DELETE', url, queryParams);
  }
}

export {rxios, rxios as Rxios};
