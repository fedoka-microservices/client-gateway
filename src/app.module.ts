import { Module } from '@nestjs/common';
import { SupplierModule } from './supplier/supplier.module';
import { ProductsModule } from './products/products.module';


@Module({
  imports: [ProductsModule, SupplierModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
