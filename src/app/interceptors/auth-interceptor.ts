import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const moddedReq = req.clone({
    url: `${environment.apiUrl}${req.url}`,
    headers: req.headers.set('accept', 'application/json')
  }).clone({
    headers: req.headers.set('Authorization', `Bearer ${environment.authToken}`)
  })

  return next(moddedReq);
};
