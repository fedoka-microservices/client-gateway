import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDER_SERVICE } from 'src/config';
import { OrderServiceTCPClient } from 'src/common/clients/order-client.tcp';

@Module({
  imports:[
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options:{
          host:envs.orderServiceHost,
          port: envs.orderServicePort
        }
      }
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrderServiceTCPClient],
})
export class OrdersModule {}
