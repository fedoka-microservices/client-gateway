import { Injectable } from "@nestjs/common";
import { HttpProvider } from "../http/http-provider";
import { FetchAdapter } from "../http/fetch-adapter";
import { PaginationDto } from "../dto/pagination.dto";
import { envs } from "src/config";
import { CreateSupplierDto } from "src/supplier/dto/create-supplier.dto";
import { UpdateSupplierDto } from "src/supplier/dto/update-supplier.dto";
import { SupplierDto } from "src/supplier/dto/supplier.dto";


@Injectable()
export class SupplierClient extends HttpProvider {
    public endpoint:string = 'suppliers';
    constructor(){
        super('envs.supplierServiceHost', new FetchAdapter());
    } 
    findAll(paginationDto:PaginationDto): Promise<SupplierDto[]>{
        const params = new URLSearchParams(paginationDto as Record<string,any>).toString();
        return this.get(`${this.endpoint}?${params}`);
    }
    
    findById(id: number){
        return this.get(this.endpoint+id);
    }

    create(createSupplierDto:CreateSupplierDto){
        return this.post(this.endpoint, createSupplierDto)
    }

    update(id: number, updateSupplierDto:UpdateSupplierDto){
        return this.put(`${this.endpoint}/${id}`, updateSupplierDto)
    }

    remove(id: number){
        return this.delete(`${this.endpoint}/${id}`);
    }
}​