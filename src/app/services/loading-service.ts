import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isLoading: Observable<boolean> = this.loading.asObservable();

  public loadingOn(): void {
    this.loading.next(true);
  }

  public loadingOff(): void {
    this.loading.next(false);
  }
}
