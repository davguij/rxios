import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs/Observable';
export interface rxiosConfig extends AxiosRequestConfig {
    localCache?: boolean;
}
declare class rxios {
    private options;
    private _httpClient;
    constructor(options?: rxiosConfig);
    private _makeRequest;
    get<T>(url: string, queryParams?: object, fullResponse?: boolean): Observable<T | AxiosResponse<T>>;
    post<T>(url: string, body: object, queryParams?: object, fullResponse?: boolean): Observable<T | AxiosResponse<T>>;
    put<T>(url: string, body: object, queryParams?: object, fullResponse?: boolean): Observable<T | AxiosResponse<T>>;
    patch<T>(url: string, body: object, queryParams?: object, fullResponse?: boolean): Observable<T | AxiosResponse<T>>;
    delete(url: string, queryParams?: object, fullResponse?: boolean): Observable<{} | AxiosResponse<{}>>;
}
export { rxios, rxios as Rxios };
