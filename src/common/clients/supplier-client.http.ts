import { Injectable } from "@nestjs/common";
import { HttpProvider } from "../http/http-provider";
import { FetchAdapter } from "../http/fetch-adapter";
import { PaginationDto } from "../dto/pagination.dto";
import { envs } from "src/config";


@Injectable()

export class SupplierClient extends HttpProvider {
    public endpoint:string = '/api/supplier/';
    constructor(){
        super(envs.supplierServiceHost, new FetchAdapter());
    } 
    findAll(paginationDto:PaginationDto){
        const params = new URLSearchParams(paginationDto as Record<string,any>).toString();
        return this.get(`${this.endpoint}?${params}`);
    }
    
    findById(id: number){
        return this.get(this.endpoint+id);
    }
}​