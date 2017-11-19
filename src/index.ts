import axios, { AxiosInstance } from 'axios';
import { Observable } from 'rxjs/Observable';

export class rxios {
  private _httpClient: AxiosInstance;
  
  constructor(private options: object) {
    this._httpClient = axios.create(options);
  }

  public get<T>(url: string) {
    return new Observable<T>(subscriber => {
      this._httpClient.get<T>(url).then(response => {
        subscriber.next(response.data);
        subscriber.complete();
      });
    });
  }

}
