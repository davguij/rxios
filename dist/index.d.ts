import { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs/Observable';
export interface rxiosConfig extends AxiosRequestConfig {
    localCache?: boolean;
}
declare class rxios {
    private options;
    private _httpClient;
    constructor(options?: rxiosConfig);
    private _makeRequest;
    get<T>(url: string, queryParams?: object, fullResponse?: boolean): Observable<any>;
    post<T>(url: string, body: object, queryParams?: object, fullResponse?: boolean): Observable<any>;
    put<T>(url: string, body: object, queryParams?: object, fullResponse?: boolean): Observable<any>;
    patch<T>(url: string, body: object, queryParams?: object, fullResponse?: boolean): Observable<any>;
    delete(url: string, queryParams?: object, fullResponse?: boolean): Observable<any>;
}
export { rxios, rxios as Rxios };
