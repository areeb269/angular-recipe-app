import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1), //TAKE 1 VALUE AND UNSUBSCRIBE AFTER THAT
      //EXHAUST CARRIES OUT PREVIOUS OBSERVABLE FIRST ('user') AND THEN PROCESSES THAT DATA AND REPLACES IT WITH NEW ONE
      exhaustMap(user => {

        if(!user){
          return next.handle(req);
        }
        const modifiedReq = req.clone({ params: new HttpParams().set('auth', user.token) });
        return next.handle(modifiedReq);
      })
    );
  }
}
