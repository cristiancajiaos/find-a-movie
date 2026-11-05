import { Component, ChangeDetectionStrategy, WritableSignal, signal, OnInit, OnDestroy, inject, computed } from '@angular/core';
import { faFilm, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { LightDarkService } from '../../../../services/light-dark-service';

@Component({
  selector: 'app-search-main-movie',
  standalone: false,
  templateUrl: './search-main-movie.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-main-movie.scss',
})
export class SearchMainMovie implements OnInit, OnDestroy {

  private lightDarkService = inject(LightDarkService);

  public bgImage: WritableSignal<string> = signal('img/bg/search-main-bg-2.jpg');
  public styleBg: WritableSignal<Object> = signal({});

  public enableBorderRadius: WritableSignal<boolean> = signal(true);
  public dropdownMenuEnd: WritableSignal<boolean> = signal(false);

  public movieIcon: IconDefinition = faFilm;

  public searchMovieText: WritableSignal<string> = signal('Search a Movie');

  public isLight: WritableSignal<boolean> = signal(true);

  public isLight$: Observable<boolean> = this.lightDarkService.isLight;

  public setBoxClass = computed(() => {
    return {
      'border-white text-light bg-dark':!this.isLight(),
      'border-dark bg-white':this.isLight()
    }
  });

  public changeLightSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.styleBg.set({
      'background-image': `url(${this.bgImage()})`
    });

    this.changeLightSubscription = this.lightDarkService.isLight.subscribe(status => {
      this.isLight.set(status);
    });
  }

  ngOnDestroy(): void {
    if (this.changeLightSubscription) {
      this.changeLightSubscription.unsubscribe();
    }
  }

}
