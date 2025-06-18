import { Module } from '@nestjs/common';

import { SupplierController } from './supplier.controller';
import { SupplierClient } from 'src/common/clients/supplier-client.http';

@Module({
  controllers: [SupplierController],
  providers: [SupplierClient],
})
export class SupplierModule {}
