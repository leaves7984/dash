import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {tap} from 'rxjs/operators';


@Injectable()
export class AuthIntercepter implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted', req);
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }
    if (localStorage.getItem('userToken') != null) {
      const clonedreq = req.clone({
        headers: req.headers
          .set('X-Auth-Token', localStorage.getItem('userToken'))
          // .set('Content-Type', 'application/json')
      });
      return next.handle(clonedreq).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            if (event.status === 401) {
              this.router.navigateByUrl('/login');
            }
          }
        }, error => {
          this.router.navigateByUrl('/login');
        }));
    }
  }
}
