import { Inject, Injectable, Logger } from "@nestjs/common";
import { PaginationDto } from "../dto/pagination.dto";
import { OrderDto } from "src/orders/dto/order.dto";
import { firstValueFrom } from "rxjs";
import { ORDER_SERVICE } from "src/config";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { CreateOrderDto } from "src/orders/dto/create-order.dto";
import { OrderPaginationDto } from "src/orders/dto/order-pagination.dto";
import { StatusDto } from "src/orders/dto/status.dto";

@Injectable()
export class OrderServiceTCPClient {
    private readonly logger = new Logger('order-service-client');
    constructor(@Inject(ORDER_SERVICE) private readonly client:ClientProxy){}

    async createOrder(createOrderDto: CreateOrderDto): Promise<OrderDto> {
        try{
            return await firstValueFrom(this.client.send('createOrder', createOrderDto));
        } catch(error) {
            throw new RpcException(error)
        }
    }

    async getOrder(id:number): Promise<OrderDto[]>{
        try{
            return await firstValueFrom(this.client.send('findOneOrder',{id}));
        } catch(error) {
            throw new RpcException(error)
        }
    }
    async getAllOrders(orderPaginationDto: OrderPaginationDto): Promise<OrderDto[]> {
        try{
            console.log('orderPaginationDto', orderPaginationDto);
            return  await firstValueFrom(this.client.send('findAllOrders', orderPaginationDto));
        } catch(error) {
            throw new RpcException(error)
        }
    }
    async getOrdersByStatus(orderPaginationDto: OrderPaginationDto): Promise<OrderDto[]>{
        try{
            return await firstValueFrom(this.client.send('findAllOrders',orderPaginationDto));
        } catch(error) {
            throw new RpcException(error)
        }
    }
    async updateOrderStatus(id:number, statusDto: StatusDto): Promise<OrderDto> {
    try{
        return await firstValueFrom(this.client.send('changeOrderStatus', {id,...statusDto}));
    } catch(error) {
        throw new RpcException(error)
    }
}
}