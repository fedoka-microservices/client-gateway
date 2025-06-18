import { CreateProductDto } from "../../products/dto/create-product.dto";
import { UpdateProductDto } from "../../products/dto/update-product.dto";
import { PaginationDto } from "../dto/pagination.dto";

export interface ProductServiceClient {
    getAllProducts(paginationDto: PaginationDto): Promise<any>;
    getProductById(id: number):Promise<any>;
    createProduct(createProductDto:CreateProductDto):Promise<any>;
    updateProduct(updateProductDto:UpdateProductDto):Promise<any>;
    deleteProduct(id:number):Promise<any>;
}