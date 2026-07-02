import { ChangeDetectorRef, Component, inject, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
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

  public isLight: boolean = true;

  private changeLightDarkSubscription: Subscription = new Subscription();

  constructor(
    private cd: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    this.loading$ = this.loading$.pipe(
      delay(0)
    );
    this.changeLightDarkSubscription = this.lightDarkService.isLight.subscribe({
      next: (status) => {
        this.isLight = status;
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
