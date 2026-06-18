import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private endLoading: Subject<boolean> = new Subject<boolean>();

  public isLoading: Observable<boolean> = this.loading.asObservable();

  public isEndLoading: Observable<boolean> = this.endLoading.asObservable();

  public loadingOn(): void {
    this.loading.next(true);
  }

  public loadingOff(): void {
    this.loading.next(false);
  }

  public notifyEndLoading() {
    this.endLoading.next(true);
  }
}
