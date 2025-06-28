import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDER_SERVICE } from 'src/config';
import { OrderServiceTCPClient } from 'src/common/clients/order-client.tcp';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports:[
   NatsModule
  ],
  controllers: [OrdersController],
  providers: [OrderServiceTCPClient],
})
export class OrdersModule {}
