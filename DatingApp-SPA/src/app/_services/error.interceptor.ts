import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
intercept(
    req: HttpRequest<any>,
    next: HttpHandler
): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
    catchError((error: HttpErrorResponse) => {
        let message: string = 'Server Error';

        if (error.status === 401) {
        message = error.statusText;
        } else {
        const appErr = error.headers.get('Application-Error');
        if (appErr) {
            message = appErr;
        } else if (error.error?.errors && typeof error.error.errors === 'object') {
            message = Object
            .values(error.error.errors)
            .flat()
            .join('\n');
        } else if (error.error) {
            message = typeof error.error === 'string'
            ? error.error
            : JSON.stringify(error.error);
        }
        }
        return throwError(() => message);
    })
    );
}
}

export const ErrorInterceptorProvider = {
provide: HTTP_INTERCEPTORS,
useClass: ErrorInterceptor,
multi: true,
};
