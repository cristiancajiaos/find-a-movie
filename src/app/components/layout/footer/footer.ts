import { Component, ChangeDetectionStrategy, WritableSignal, signal, computed } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './footer.scss'
})
export class Footer {

  public creationYear: WritableSignal<number> = signal(new Date (2025, 9, 3).getFullYear());
  public currentYear: WritableSignal<number> = signal(new Date().getFullYear());

  public usesAPIOneText: WritableSignal<string> = signal('Uses the');
  public tmdbUrl: WritableSignal<string> = signal('https://www.themoviedb.org/');
  public tmdbImg: WritableSignal<string> = signal('img/tmdb-logo.svg');
  public usesAPITwoText: WritableSignal<string> = signal('API');

  public appVersionText: WritableSignal<string> = signal(`App version: ${environment.appVersion}`);

  public authorText = computed(() => {
    return `Cristian Cajiao Skarnic, ${this.creationYear()} - ${this.currentYear()}`;
  });
}
