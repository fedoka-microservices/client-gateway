import { Inject, Injectable, Logger } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { NATS_SERVICE } from "src/config";
import { ClientProxy, RpcException } from "@nestjs/microservices";

import { PaginationDto } from "src/common/dto/pagination.dto";
import { SupplierDto } from "src/supplier/dto/supplier.dto";
import { CreateSupplierDto } from "src/supplier/dto/create-supplier.dto";
import { UpdateSupplierDto } from "src/supplier/dto/update-supplier.dto";

@Injectable()
export class SupplierServiceClientNats {
    private readonly logger = new Logger('supplier-service-client');
    constructor(@Inject(NATS_SERVICE) private readonly client:ClientProxy){}

    // async createOrder(createOrderDto: CreateOrderDto): Promise<OrderDto> {
    //     try{
    //         return await firstValueFrom(this.client.send('createOrder', createOrderDto));
    //     } catch(error) {
    //         this.logger.error('Error creating order', error);
    //         throw new RpcException(error)
    //     }
    // }

    // async getOrder(id:number): Promise<OrderDto[]>{
    //     try{
    //         return await firstValueFrom(this.client.send('findOneOrder',{id}));
    //     } catch(error) {
    //         this.logger.error('Error GET order', error);
    //         throw new RpcException(error)
    //     }
    // }
    async  create(createSupplierDto:CreateSupplierDto):Promise<SupplierDto>{
        try{
            const resp =  await firstValueFrom(this.client.send('suppliers.create', createSupplierDto));
            if (resp && typeof resp === 'object' && 'message' in resp && 'status' in resp) {
                throw new RpcException(resp.message);
            }
            return resp as SupplierDto;
        } catch(error) {
            this.logger.error('Error GET suppliers', error);
            throw new RpcException(error)
        }
    }

    async update(id:number, updateSupplierDto: UpdateSupplierDto): Promise<SupplierDto>{
        try{
            const resp =  await firstValueFrom(this.client.send('suppliers.update', {id, ...updateSupplierDto}));
            if (resp && typeof resp === 'object' && 'message' in resp && 'status' in resp) {
                throw new RpcException(resp.message);
            }
            return resp as SupplierDto;
        } catch(error) {
            this.logger.error('Error Update supplier', error);
            throw new RpcException(error)
        }
    }

    async findById(id: number): Promise<SupplierDto> {
        try{
            const resp =  await firstValueFrom(this.client.send('suppliers.findById', {id}));
            if (resp && typeof resp === 'object' && 'message' in resp && 'status' in resp) {
                throw new RpcException(resp.message);
            }
            return resp as SupplierDto;
        } catch(error) {
            this.logger.error('Error GET suppliers', error);
            throw new RpcException(error)
        }
    }
    async findAll(paginationDto:PaginationDto): Promise<SupplierDto[]>{
        try{
            const resp =  await firstValueFrom(this.client.send('suppliers.getAll', paginationDto));
            if (resp && typeof resp === 'object' && 'message' in resp && 'status' in resp) {
                throw new RpcException(resp.message);
            }
            return resp as SupplierDto[];
        } catch(error) {
            this.logger.error('Error GET suppliers', error);
            throw new RpcException(error)
        }
    }
//     async getOrdersByStatus(orderPaginationDto: OrderPaginationDto): Promise<OrderDto[]>{
//         try{
//             return await firstValueFrom(this.client.send('findAllOrders',orderPaginationDto));
//         } catch(error) {
//             this.logger.error('Error GET orders by status', error);
//             throw new RpcException(error)
//         }
//     }
//     async updateOrderStatus(id:number, statusDto: StatusDto): Promise<OrderDto> {
//     try{
//         return await firstValueFrom(this.client.send('changeOrderStatus', {id,...statusDto}));
//     } catch(error) {
//     this.logger.error('Error updating order status', error);
//         throw new RpcException(error)
//     }
// }
}