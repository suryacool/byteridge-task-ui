import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ClientIpInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let clientip = sessionStorage.getItem("clientip");
        if (clientip && clientip) {
            request = request.clone({
                setHeaders: {
                    clientip: `${clientip}`
                }
            });
        }

        return next.handle(request);
    }
}