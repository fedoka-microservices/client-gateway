import { Inject, Injectable, Logger } from "@nestjs/common";
import { OrderDto } from "src/orders/dto/order.dto";
import { firstValueFrom } from "rxjs";
import { NATS_SERVICE } from "src/config";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { CreateOrderDto } from "src/orders/dto/create-order.dto";
import { OrderPaginationDto } from "src/orders/dto/order-pagination.dto";
import { StatusDto } from "src/orders/dto/status.dto";

@Injectable()
export class OrderServiceTCPClient {
    private readonly logger = new Logger('order-service-client');
    constructor(@Inject(NATS_SERVICE) private readonly client:ClientProxy){}

    async createOrder(createOrderDto: CreateOrderDto): Promise<OrderDto> {
        try{
            return await firstValueFrom(this.client.send('createOrder', createOrderDto));
        } catch(error) {
            this.logger.error('Error creating order', error);
            throw new RpcException(error)
        }
    }

    async getOrder(id:number): Promise<OrderDto[]>{
        try{
            return await firstValueFrom(this.client.send('findOneOrder',{id}));
        } catch(error) {
            this.logger.error('Error GET order', error);
            throw new RpcException(error)
        }
    }
    async getAllOrders(orderPaginationDto: OrderPaginationDto): Promise<OrderDto[]> {
        try{
            console.log('orderPaginationDto', orderPaginationDto);
            return  await firstValueFrom(this.client.send('findAllOrders', orderPaginationDto));
        } catch(error) {
            this.logger.error('Error GET order', error);
            throw new RpcException(error)
        }
    }
    async getOrdersByStatus(orderPaginationDto: OrderPaginationDto): Promise<OrderDto[]>{
        try{
            return await firstValueFrom(this.client.send('findAllOrders',orderPaginationDto));
        } catch(error) {
            this.logger.error('Error GET orders by status', error);
            throw new RpcException(error)
        }
    }
    async updateOrderStatus(id:number, statusDto: StatusDto): Promise<OrderDto> {
    try{
        return await firstValueFrom(this.client.send('changeOrderStatus', {id,...statusDto}));
    } catch(error) {
    this.logger.error('Error updating order status', error);
        throw new RpcException(error)
    }
}
}