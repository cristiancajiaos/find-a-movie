import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-movie-nav',
  standalone: false,
  templateUrl: './movie-nav.html',
  styleUrl: './movie-nav.scss',
})
export class MovieNav {

  public overviewMenuText: WritableSignal<string> = signal('Overview');
  public castMenuText: WritableSignal<string> = signal('Cast');
  public featuredCrewMenuText: WritableSignal<string> = signal('Featured Crew');
  public fullCrewMenuText: WritableSignal<string> = signal('Full Crew');
  public videoGalleryMenuText: WritableSignal<string> = signal('Video Gallery');
  public recommendationsMenuText: WritableSignal<string> = signal('Recommendations');
  public similarMenuText: WritableSignal<string> = signal('Similar');
}
