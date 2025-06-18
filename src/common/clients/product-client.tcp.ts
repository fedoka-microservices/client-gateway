import {  Inject, Injectable, Logger } from "@nestjs/common";
import { ProductServiceClient } from "../interfaces/product-client.interface";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { PRODUCT_SERVICE } from "src/config";
import { CreateProductDto } from "../../products/dto/create-product.dto";
import { UpdateProductDto } from "../../products/dto/update-product.dto";
import { PaginationDto } from "../dto/pagination.dto";

@Injectable()
export class ProductServiceClientTCP implements ProductServiceClient {
    private readonly logger = new Logger('product-service-client');
    constructor(@Inject(PRODUCT_SERVICE) private readonly client: ClientProxy){}
    
    async createProduct(createProductDto: CreateProductDto):Promise<any> {
        try {
            return await this.client.send({cmd:'create_product'},createProductDto);
        } catch(error) {
            throw new RpcException(error)
        }
        
    }

    async updateProduct(updateProductDto: UpdateProductDto): Promise<any> {
         try {
            return await this.client.send({cmd:'update_product'},updateProductDto);
        } catch (error) {
             throw new RpcException(error)
        }
    }

    async getAllProducts(paginationDto: PaginationDto): Promise<any> {
        // this.logger.log('GET all executed in product-service');
        //if any validation needs to be done before sending the data, needs to be done here instead of modifiying all lines of codes that requires it.
        try {
            return await firstValueFrom(this.client.send({cmd:'find_all'}, paginationDto));
        } catch (error) {
             throw new RpcException(error)
        }
       
    }
    
    async getProductById(id: number): Promise<any> {
        try{
            return await firstValueFrom(this.client.send({cmd:'find_one_by_id'},{id}));
        } catch(error) {
            throw new RpcException(error)
        }
    }
    
    async deleteProduct(id: number): Promise<any> {
        try{
            return await firstValueFrom(this.client.send({cmd:'delete_product'}, {id}))
        } catch(error) {
            throw new RpcException(error)
        }
    }
}