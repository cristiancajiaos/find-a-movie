import { Component, OnChanges, ChangeDetectionStrategy, input, WritableSignal, signal } from '@angular/core';
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

  public noReleaseDateText: WritableSignal<string> = signal('No Release Date');

  id = input.required<number>();
  movie = input.required<Movie>();

  public year: WritableSignal<number> = signal(0);
  public backdropImg: WritableSignal<string> = signal('');

  ngOnChanges() {
    this.setYear();
    this.setHeaderBg();
  }

  private setYear(): void {
    const releaseYear: Date = new Date(this.movie().release_date);
    this.year.set(releaseYear.getFullYear());
  }

  private setHeaderBg(): void {
    this.movieHeaderBg.set({
      'background-image': `url(${this.movie().backdrop_path})`
    });
  }
}
