import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-exceptions.filter';


async function bootstrap() {
  const logger = new Logger('gateway')
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
   app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true
    })
  );
  app.useGlobalFilters(new RpcCustomExceptionFilter);
  await app.listen(envs.port);
  logger.log('Gateway running on port ' + envs.port)
}
bootstrap();
