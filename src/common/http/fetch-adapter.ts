import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { HttpAdapter } from "../interfaces/http-adapter.interface";

export class FetchAdapter implements HttpAdapter {
   async request<T>(method: string, baseUrl:string, endpoint: string, headers: Record<string, string>, body?: any): Promise<T> {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new NotFoundException('resource not found');
        case 422:
          throw new BadRequestException(`Datos inválidos: ${JSON.stringify(data)}`)
        case 500:
          throw new InternalServerErrorException(`Error interno del servidor: ${data}`);
        default:
          throw new Error(`Error HTTP ${response.status}: ${data}`);
      }
    }

    return data;
  }
}

