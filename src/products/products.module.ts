import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCT_SERVICE } from 'src/config';
import { ProductServiceClientTCP } from '../common/clients/product-client.tcp';

@Module({
  imports:[
    ClientsModule.register([
      { name: PRODUCT_SERVICE, transport: Transport.TCP, options:{
        host: envs.productServiceHost,
        port: envs.productServicesPort,
      } },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductServiceClientTCP],
})
export class ProductsModule {}
