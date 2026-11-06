import { Component, computed, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { IconDefinition, faFilm, faUser } from '@fortawesome/free-solid-svg-icons';
import { LightDarkService } from '../../../../services/light-dark-service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-select-input-search',
  standalone: false,
  templateUrl: './select-input-search.html',
  styleUrl: './select-input-search.scss',
})
export class SelectInputSearch implements OnInit, OnDestroy {

  private lightDarkService = inject(LightDarkService);

  public filmIcon: IconDefinition = faFilm;
  public userIcon: IconDefinition = faUser;

  public movieButtonText: WritableSignal<string> = signal('Movie');
  public personButtonText: WritableSignal<string> = signal('Person');

  public searchType: WritableSignal<string> = signal('movie');

  public isLight: WritableSignal<boolean> = signal(true);
  public isLight$: Observable<boolean> = this.lightDarkService.isLight;

  public setSearchTypeClass = computed(() => {
    return {
      'border-white text-dark dark-mode':!this.isLight(),
      'border-dark text-dark':this.isLight()
    }
  });

  public changeLightDarkSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.changeLightDarkSubscription = this.isLight$.subscribe({
      next: (status) => {
        this.isLight.set(status);
      }
    });
  }

  public selectSearchType(searchType: string): void {
    this.searchType.set(searchType);
  }

  public toggleLightDark() {
    if (this.isLight()) {
      this.lightDarkService.changeToDark();
    } else {
      this.lightDarkService.changeToLight();
    }
  }


  ngOnDestroy(): void {
    if (this.changeLightDarkSubscription) {
      this.changeLightDarkSubscription.unsubscribe();
    }
  }

}
