import { HttpAdapter } from "../interfaces/http-adapter.interface";

export abstract class HttpProvider {
    private readonly headers = {'Content-Type':'application/json', 'Accept':'application/json'};
    constructor(private readonly baseUrl:string, private readonly adapter: HttpAdapter){}    
    protected get<T>(endpoint: string) {
        return this.adapter.request<T>('GET',this.baseUrl, endpoint, this.headers);
    }

    protected post<T>(endpoint: string, body: any) {
        return this.adapter.request<T>('POST', this.baseUrl, endpoint,  this.headers, body);
    }

    protected put<T>(endpoint: string, body: any) {
        return this.adapter.request<T>('PUT', this.baseUrl, endpoint,  this.headers, body);
    }
    protected delete<T>(endpoint:string, ) {
        return this.adapter.request<T>('DELETE', this.baseUrl,endpoint, this.headers);
    }
}