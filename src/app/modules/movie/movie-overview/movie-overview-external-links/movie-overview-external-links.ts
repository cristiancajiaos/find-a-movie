import { Component, input, InputSignal, OnChanges, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { faImdb } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Movie } from '../../../../classes/movie';
import { MovieExternalIds } from '../../../../classes/movie-external-ids';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-movie-overview-external-links',
  standalone: false,
  templateUrl: './movie-overview-external-links.html',
  styleUrl: './movie-overview-external-links.scss',
})
export class MovieOverviewExternalLinks implements OnChanges {
  public externalLinksText: WritableSignal<string> = signal('External Links');

  public movieImdb: WritableSignal<string> = signal('');
  public imdbIcon: IconDefinition = faImdb;
  public imdbText: WritableSignal<string> = signal('IMDB');

  public movieOfficialWebsite: WritableSignal<string> = signal('');
  public globeIcon: IconDefinition = faGlobe;
  public officialWebsiteText: WritableSignal<string> = signal('Official website');

  movie: InputSignal<Movie> = input.required<Movie>();
  movieExternalIds: InputSignal<MovieExternalIds> = input.required<MovieExternalIds>();

  ngOnChanges(changes: SimpleChanges): void {
    this.setMovieIMDB();
    this.setMovieOfficialWebsite();
  }

  private setMovieIMDB(): void {
      if (this.movie().imdb_id) {
        this.movieImdb.set(`${environment.imdbMovieUrl}${this.movie().imdb_id}/`);
      }
    }

    private setMovieOfficialWebsite(): void {
      if (this.movie().homepage) {
        this.movieOfficialWebsite.set(`${this.movie().homepage}`);
      }
    }
}

