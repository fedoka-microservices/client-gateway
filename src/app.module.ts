import { Module } from '@nestjs/common';
import { SupplierModule } from './supplier/supplier.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { NatsModule } from './transports/nats.module';


@Module({
  imports: [ProductsModule, SupplierModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
