
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter{
  catch(exception: RpcException, host: ArgumentsHost): any{
    const ctx = host.switchToHttp();
    const resp = ctx.getResponse();
    const rpcError = exception.getError();
    if ( rpcError.toString().includes('Empty response')){
      return resp.status(400).json({
          status: 500,
          message: rpcError.toString().substring(0, rpcError.toString().indexOf('(', - 1))
      });
    }
    if (
        typeof rpcError === 'object' &&
        rpcError !== null &&
        'status' in rpcError &&
        'message' in rpcError
    ) {
        const status =
            isNaN(Number((rpcError as { status: any }).status))
                ? 400
                : Number((rpcError as { status: any }).status);
        return resp.status(status).json(rpcError);
    }
   
    resp.status(400).json({
        status: 400,
        message: rpcError['error'] || rpcError
    });

  }
}
