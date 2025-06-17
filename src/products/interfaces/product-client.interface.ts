import { PaginationDto } from "src/common";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";

export interface ProductServiceClient {
    getAllProducts(paginationDto: PaginationDto): Promise<any>;
    getProductById(id: number):Promise<any>;
    createProduct(createProductDto:CreateProductDto):Promise<any>;
    updateProduct(updateProductDto:UpdateProductDto):Promise<any>;
    deleteProduct(id:number):Promise<any>;
}