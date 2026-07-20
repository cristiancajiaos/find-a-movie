import { Component, inject, OnInit, ChangeDetectionStrategy, OnDestroy, WritableSignal, signal } from '@angular/core';
import { LoadingService } from '../../services/loading-service';
import { delay, Observable, Subscription } from 'rxjs';
import { LightDarkService } from '../../services/light-dark-service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './layout.scss'
})
export class Layout implements OnInit, OnDestroy {

  private lightDarkService = inject(LightDarkService);
  private loadingService = inject(LoadingService);

  public loading$: Observable<boolean> = this.loadingService.isLoading;

  public isLight: WritableSignal<boolean> = signal(true);

  private changeLightDarkSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.loading$ = this.loading$.pipe(
      delay(0)
    );
    this.changeLightDarkSubscription = this.lightDarkService.isLight.subscribe({
      next: (status) => {
        this.isLight.set(status);
      },
      error: (error) => {},
      complete: () => {}
    });
  }

  ngOnDestroy(): void {
    if (this.changeLightDarkSubscription) {
      this.changeLightDarkSubscription.unsubscribe();
    }
  }

}
