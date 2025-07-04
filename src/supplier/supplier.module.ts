import { Module } from '@nestjs/common';

import { SupplierController } from './supplier.controller';
import { NatsModule } from 'src/transports/nats.module';
import { SupplierServiceClientNats } from 'src/common/clients/supplier-client.nats';
@Module({
  imports:[
      NatsModule
    ],
  controllers: [SupplierController],
  providers: [ SupplierServiceClientNats],
})
export class SupplierModule {}
