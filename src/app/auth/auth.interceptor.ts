import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem('token');
    let authRequest;
    if(authToken) {
      authRequest = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + authToken)
      });
    } else {
      authRequest = req.clone();
    }
    return next.handle(authRequest);
  }
}
