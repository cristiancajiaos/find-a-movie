import { Service } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Service()
export class LightDarkService {

  private light: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public isLight: Observable<boolean> = this.light.asObservable();

  public changeToLight(): void {
    this.light.next(true);
  }

  public changeToDark(): void {
    this.light.next(false);
  }

}
