
import { Catch, RpcExceptionFilter, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter{
  catch(exception: RpcException, host: ArgumentsHost): any{
    const ctx = host.switchToHttp();
    const resp = ctx.getResponse();
    const rpcError = exception.getError();

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
        message: rpcError
    });

  }
}
