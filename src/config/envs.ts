import 'dotenv/config'
import * as joi from 'joi'
import { PRODUCT_SERVICE } from './services';

interface EnvVars {
    PORT:number;
    PRODUCT_SERVICE_HOST:string;
    PRODUCT_SERVICE_PORT:number;
    SUPPLIER_SERVICE_HOST:string; 
    SUPPLIER_SERVICE_PORT:number;
    ORDER_SERVICE_PORT:number;
    ORDER_SERVICE_HOST: string;
    NATS_SERVERS: string[];
}

const envSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCT_SERVICE_PORT: joi.number().required(),
    PRODUCT_SERVICE_HOST: joi.string().required(),
    SUPPLIER_SERVICE_PORT: joi.number().required(),
    SUPPLIER_SERVICE_HOST: joi.string().required(),
    ORDER_SERVICE_PORT: joi.number().required(),
    ORDER_SERVICE_HOST: joi.string().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required()
})
.unknown(true);

const {error, value} = envSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(',') 
})

if (error) {
    throw new Error('Config validation error:' + error.message)
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    productServiceHost: envVars.PRODUCT_SERVICE_HOST,
    productServicesPort: envVars.PRODUCT_SERVICE_PORT,
    supplierServiceHost: envVars.SUPPLIER_SERVICE_HOST,
    supplierServicesPort: envVars.SUPPLIER_SERVICE_PORT,
    orderServiceHost: envVars.ORDER_SERVICE_HOST,
    orderServicePort: envVars.ORDER_SERVICE_PORT,
    natsServers: envVars.NATS_SERVERS
}