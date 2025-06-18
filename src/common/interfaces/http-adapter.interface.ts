
export interface HttpAdapter {
    request<T>(method: string,baseUrl:string, endpoint: string, headers: Record<string, string>, body?: any):Promise<T>;
}