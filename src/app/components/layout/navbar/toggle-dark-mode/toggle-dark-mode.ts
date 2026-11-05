import { Component, computed, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { LightDarkService } from '../../../../services/light-dark-service';
import { Observable, Subscription } from 'rxjs';
import { IconDefinition, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toggle-dark-mode',
  standalone: false,
  templateUrl: './toggle-dark-mode.html',
  styleUrl: './toggle-dark-mode.scss',
})
export class ToggleDarkMode implements OnInit, OnDestroy {

  private lightDarkService = inject(LightDarkService);

  public lightIcon: IconDefinition = faSun;
  public darkIcon: IconDefinition = faMoon;

  public toggleTooltip: WritableSignal<string> = signal('Toggle Dark Mode');

  public isLight: WritableSignal<boolean> = signal(true);
  public isLight$: Observable<boolean> = this.lightDarkService.isLight;

  public setButtonClass = computed(() => {
    return {
      'border-white text-dark dark-mode':!this.isLight(),
      'border-dark text-dark':this.isLight()
    }
  });

  private changeLightDarkSubscription: Subscription = new Subscription();

  public toggleLightDark() {
    if (this.isLight()) {
      this.lightDarkService.changeToDark();
    } else {
      this.lightDarkService.changeToLight();
    }
  }

  ngOnInit(): void {
    this.changeLightDarkSubscription = this.isLight$.subscribe({
      next: (status) => {
        this.isLight.set(status);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.changeLightDarkSubscription) {
      this.changeLightDarkSubscription.unsubscribe();
    }
  }
}
