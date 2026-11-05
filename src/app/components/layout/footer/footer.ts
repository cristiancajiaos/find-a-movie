import { Component, ChangeDetectionStrategy, WritableSignal, signal, computed, OnDestroy, OnInit, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { LightDarkService } from '../../../services/light-dark-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './footer.scss'
})
export class Footer implements OnInit, OnDestroy {

  private lightDarkService = inject(LightDarkService);

  public creationYear: WritableSignal<number> = signal(new Date (2025, 9, 3).getFullYear());
  public currentYear: WritableSignal<number> = signal(new Date().getFullYear());

  public usesAPIOneText: WritableSignal<string> = signal('Uses the');
  public tmdbUrl: WritableSignal<string> = signal('https://www.themoviedb.org/');
  public tmdbImg: WritableSignal<string> = signal('img/tmdb-logo.svg');
  public usesAPITwoText: WritableSignal<string> = signal('API');

  public appVersionText: WritableSignal<string> = signal(`App version: ${environment.appVersion}`);

  public isLight: WritableSignal<boolean> = signal(true);

  private changeLightDarkSubscription: Subscription = new Subscription();

  public authorText = computed(() => {
    return `Cristian Cajiao Skarnic, ${this.creationYear()} - ${this.currentYear()}`;
  });

  public setClass = computed(() => {
    return {'dark-mode': !this.isLight()}
  });

  ngOnInit(): void {
    this.changeLightDarkSubscription = this.lightDarkService.isLight.subscribe({
      next: (status) => {
        this.isLight.set(status);
      },
      error: (error) => {},
      complete: () => {}
    })
  }

  ngOnDestroy(): void {
    if (this.changeLightDarkSubscription) {
      this.changeLightDarkSubscription.unsubscribe();
    }
  }

}
