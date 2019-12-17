import {HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEventType} from '@angular/common/http'

import {map, tap} from 'rxjs/operators'

export class AuthInterceptorService implements HttpInterceptor{
  intercept(req : HttpRequest<any>, next: HttpHandler)
  {
    console.log("request is on way");
    const modifiedReq = req.clone({headers : req.headers.append('auth', 'xyz')});
    console.log("modified request");
    return next.handle(modifiedReq).pipe(tap(event =>{
      console.log(event);
      if(event.type == HttpEventType.Response)
      {
        console.log("response arrived");
        console.log(event.body)
      }
    }));
  }

}