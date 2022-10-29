import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router:Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if(req.headers.get('No-Auth') == "True"){
            return next.handle(req);
        }
        else{
            const accessToken = this.authService.getAccessToken();
            if (accessToken != null){
                const authReq = req.clone({
                    setHeaders: {Authorization: `Token ${accessToken}`},
                });
                // // console.log(authReq);
                return next.handle(authReq).pipe(
                    map((event: HttpEvent<any>) => {
                        return event;
                    }),
                    catchError((error: HttpErrorResponse) => {
                        let data = {};
                        data = {
                            reason: error && error.error && error.error.reason ? error.error.reason : '',
                            status: error.status
                        };
                        if(error.status == 401){
                            this.router.navigate(['/auth/login']);
                        }
                        
                        return throwError(error);
                    })
                );
            }else {
                this.router.navigate(['/auth/login']);
            }
            
        }
        
    }
}