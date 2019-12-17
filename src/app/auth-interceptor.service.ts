import {HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http'

export class AuthInterceptorService implements HttpInterceptor{
  intercept(req : HttpRequest<any>, next: HttpHandler)
  {
    console.log("request is on way");
    const modifiedReq = req.clone({headers : req.headers.append('auth', 'xyz')});
    console.log("modified request");
    return next.handle(modifiedReq);
  }

}