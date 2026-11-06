import { Component, OnInit, ChangeDetectionStrategy, inject, OnDestroy, WritableSignal, signal, computed } from '@angular/core';
import { faFilm, faUser, faBars, faMagnifyingGlass, IconDefinition, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { LightDarkService } from '../../../services/light-dark-service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit, OnDestroy {

  private lightDarkService = inject(LightDarkService);

  public filmIcon: IconDefinition = faFilm;
  public userIcon: IconDefinition = faUser;

  public appTitle: WritableSignal<string> = signal('Find a Movie');
  public movieButtonText: WritableSignal<string> = signal('Movie');
  public personButtonText: WritableSignal<string> = signal('Person');

  public isMenuCollapsed: WritableSignal<boolean> = signal(false);
  public searchType: WritableSignal<string> = signal('movie');

  public isLight: WritableSignal<boolean> = signal(true);
  public isLight$: Observable<boolean> = this.lightDarkService.isLight;

  public setNavbarClass = computed(() => {
    return {
      'navbar-dark bg-dark dark-mode':!this.isLight(),
      'bg-light':this.isLight()
    }
  });

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
