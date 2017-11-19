import axios, { AxiosInstance } from 'axios';
import { Observable } from 'rxjs/Observable';

export class rxios {
  private _httpClient: AxiosInstance;
  
  constructor(private options: object) {
    this._httpClient = axios.create(options);
  }


}
