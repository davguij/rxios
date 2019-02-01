import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import { Observable } from 'rxjs/Observable';

export interface rxiosConfig extends AxiosRequestConfig {
	localCache?: boolean;
}

class rxios {
	private _httpClient: AxiosInstance;

	constructor(private options: rxiosConfig = {}) {
		this._httpClient = axios.create(options);
	}

	private _makeRequest<T>(method: string, url: string, queryParams?: object, body?: object, fullResponse: boolean = false) {
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
		return new Observable<any>(subscriber => {
			request.then(response => {
				subscriber.next(fullResponse ? response : response.data);
				subscriber.complete();
			}).catch((err: Error) => {
				subscriber.error(err);
				subscriber.complete();
			});
		});
	}

	public get<T>(url: string, queryParams?: object, fullResponse?: boolean) {
		return this._makeRequest<T>('GET', url, queryParams, undefined, fullResponse);
	}

	public post<T>(url: string, body: object, queryParams?: object, fullResponse?: boolean) {
		return this._makeRequest<T>('POST', url, queryParams, body, fullResponse);
	}

	public put<T>(url: string, body: object, queryParams?: object, fullResponse?: boolean) {
		return this._makeRequest<T>('PUT', url, queryParams, body, fullResponse);
	}

	public patch<T>(url: string, body: object, queryParams?: object, fullResponse?: boolean) {
		return this._makeRequest<T>('PATCH', url, queryParams, body, fullResponse);
	}

	public delete(url: string, queryParams?: object, fullResponse?: boolean) {
		return this._makeRequest('DELETE', url, queryParams, undefined, fullResponse);
	}
}

export {rxios, rxios as Rxios};
