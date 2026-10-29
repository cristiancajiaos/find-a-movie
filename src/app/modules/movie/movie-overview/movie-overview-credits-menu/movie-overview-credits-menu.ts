import { Component, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { Movie } from '../../../../classes/movie';

@Component({
  selector: 'app-movie-overview-credits-menu',
  standalone: false,
  templateUrl: './movie-overview-credits-menu.html',
  styleUrl: './movie-overview-credits-menu.scss',
})
export class MovieOverviewCreditsMenu {

  public viewFullCastText: WritableSignal<string> = signal('View Full Cast');
  public viewFeaturedCrewText: WritableSignal<string> = signal('View Featured Crew');
  public viewFullCrewText: WritableSignal<string> = signal('View Full Crew');

  movie: InputSignal<Movie> = input.required<Movie>();
}
