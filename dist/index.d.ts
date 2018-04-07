import { AxiosRequestConfig } from 'axios';
export interface rxiosConfig extends AxiosRequestConfig {
    localCache?: boolean;
}
declare class rxios {
    private options;
    private _httpClient;
    constructor(options?: rxiosConfig);
    private _makeRequest<T>(method, url, config?, body?);
    get<T>(url: string, config?: object): any;
    post<T>(url: string, body: object, config?: object): any;
    put<T>(url: string, body: object, config?: object): any;
    patch<T>(url: string, body: object, config?: object): any;
    delete(url: string, config?: object): any;
}
export { rxios, rxios as Rxios };
