import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-movie-nav',
  standalone: false,
  templateUrl: './movie-nav.html',
  styleUrl: './movie-nav.scss',
})
export class MovieNav {

  public overviewMenu: WritableSignal<string> = signal('Overview');
  public castMenu: WritableSignal<string> = signal('Cast');
  public featuredCrewMenu: WritableSignal<string> = signal('Featured Crew');
  public fullCrewMenu: WritableSignal<string> = signal('Full Crew');
  public recommendationsMenu: WritableSignal<string> = signal('Recommendations');
  public similarMenu: WritableSignal<string> = signal('Similar');
}
