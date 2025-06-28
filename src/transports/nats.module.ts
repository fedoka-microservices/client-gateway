import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE } from 'src/config';

const natsModule =  ClientsModule.register([
        { 
        name: NATS_SERVICE, 
        transport: Transport.NATS,
        options:{
        servers: envs.natsServers
        } 
        },
    ]);
@Module({
    imports:[
        natsModule
    ],
    exports: [
        natsModule
    ]
})
export class NatsModule {
    
}
