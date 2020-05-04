import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TokenService } from '../services/token.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = this.tokenService.get();

        if (token) {
            request = request.clone({ headers: request.headers.set('X-Test-App-Jwt-Token', token) });
        }

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                this.tokenService.remove();
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                return throwError(error);
            }));
    }
}
