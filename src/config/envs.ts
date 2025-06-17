import 'dotenv/config'
import * as joi from 'joi'
import { PRODUCT_SERVICE } from './services';

interface EnvVars {
    PORT:number;
    PRODUCT_SERVICE_PORT:number;
    PRODUCT_SERVICE_HOST:string;
}

const envSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCT_SERVICE_PORT: joi.number().required(),
    PRODUCT_SERVICE_HOST: joi.string().required()
})
.unknown(true);

const {error, value} = envSchema.validate(process.env)

if (error) {
    throw new Error('Config validation error:' + error.message)
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    productServiceHost: envVars.PRODUCT_SERVICE_HOST,
    productServicesPort: envVars.PRODUCT_SERVICE_PORT

}