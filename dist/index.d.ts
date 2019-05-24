import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs/Observable';
export interface rxiosConfig extends AxiosRequestConfig {
    localCache?: boolean;
}
declare class rxios {
    private options;
    _httpClient: AxiosInstance;
    constructor(options?: rxiosConfig);
    private _makeRequest;
    request<T>(config: object): Observable<any>;
    get<T>(url: string, queryParams?: object, fullResponse?: boolean): Observable<any>;
    post<T>(url: string, body: object, queryParams?: object, fullResponse?: boolean): Observable<any>;
    put<T>(url: string, body: object, queryParams?: object, fullResponse?: boolean): Observable<any>;
    patch<T>(url: string, body: object, queryParams?: object, fullResponse?: boolean): Observable<any>;
    delete(url: string, queryParams?: object, fullResponse?: boolean): Observable<any>;
}
export { rxios, rxios as Rxios };
