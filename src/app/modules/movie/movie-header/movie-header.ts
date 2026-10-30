import { Component, OnChanges, ChangeDetectionStrategy, input, WritableSignal, signal, InputSignal } from '@angular/core';
import { Movie } from '../../../classes/movie';
import {
  faFilm,
  faClock,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-header',
  standalone: false,
  templateUrl: './movie-header.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movie-header.scss',
})
export class MovieHeader implements OnChanges {

  public film: IconDefinition = faFilm;
  public clock: IconDefinition = faClock;

  public movieHeaderBg: WritableSignal<Object> = signal('');

  movie: InputSignal<Movie> = input.required<Movie>();
  formattedTitle: InputSignal<string> = input.required<string>();

  ngOnChanges() {
    this.setHeaderBg();
  }

  private setHeaderBg(): void {
    this.movieHeaderBg.set({
      'background-image': `url(${this.movie().backdrop_path})`
    });
  }
}
