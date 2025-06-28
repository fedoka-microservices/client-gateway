import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductServiceClientTCP } from '../common/clients/product-client.tcp';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports:[
    NatsModule
  ],
  controllers: [ProductsController],
  providers: [ProductServiceClientTCP],
})
export class ProductsModule {}
