import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios';
import { Observable } from 'rxjs/Observable';

export interface rxiosConfig extends AxiosRequestConfig {
  localCache?: boolean;
}

export class rxios {
  private _httpClient: AxiosInstance;
  
  constructor(private options: rxiosConfig = {}) {
    this._httpClient = axios.create(options);
  }

  public get<T>(url: string, queryParams?: object) {
    return new Observable<T>(subscriber => {
      this._httpClient.get<T>(url, queryParams).then(response => {
        subscriber.next(response.data);
        subscriber.complete();
      }).catch((err: Error) => {
        subscriber.error(err);
        subscriber.complete();
      });
    });
  }

  public post<T>(url: string, body: object, queryParams?: object) {
    return new Observable<T>(subscriber => {
      this._httpClient.post<T>(url, body, queryParams).then(response => {
        subscriber.next(response.data);
        subscriber.complete();
      }).catch((err: Error) => {
        subscriber.error(err);
        subscriber.complete();
      });
    });
  }
  
}
