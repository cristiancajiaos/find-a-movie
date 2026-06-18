import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading-service';
import { TitleService } from '../services/title-service';

export const SkipLoading = new HttpContextToken<boolean>(() => false);

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const loadingService = inject(LoadingService);
  const titleService = inject(TitleService);

  if (req.context.get(SkipLoading)) {
    return next(req);
  }

  loadingService.loadingOn();
  titleService.setTitle('Loading...');

  return next(req).pipe(
    finalize(() => {
      loadingService.loadingOff();
      loadingService.notifyEndLoading();
    })
  )
};
