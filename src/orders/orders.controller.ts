import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderServiceTCPClient } from 'src/common/clients/order-client.tcp';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { OrderStatus } from './enum/order.enum';
import { StatusDto } from './dto/status.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderServiceClient: OrderServiceTCPClient) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderServiceClient.createOrder(createOrderDto);
  }

  @Get()
  findAll(@Query() orderPaginationDto:OrderPaginationDto) {
    return this.orderServiceClient.getAllOrders(orderPaginationDto);
  }

  @Get('id/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderServiceClient.getOrder(id);
  }

  @Get(':status')
  findAllByStatus(@Param() statusDto: StatusDto, @Query() paginationDto: PaginationDto) {
    return this.orderServiceClient.getOrdersByStatus({status: statusDto.status, ...paginationDto});
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe)   id: number, @Body() statusDto: StatusDto) {
    return this.orderServiceClient.updateOrderStatus(id, statusDto);
  }
}
