import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    ConflictException,
    CallHandler
} from '@nestjs/common'

import { Observable, throwError, catchError } from 'rxjs'
import { Prisma } from '@prisma/client';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle().pipe(catchError(
            err => {
                if (err instanceof Prisma.PrismaClientKnownRequestError) {
                    if (err.code === 'P2002') {
                        return throwError(() => new ConflictException("Username has already been used"))
                    }
                }
                return throwError(() => err); // forward throw the error
            }
        ))
    }

}
