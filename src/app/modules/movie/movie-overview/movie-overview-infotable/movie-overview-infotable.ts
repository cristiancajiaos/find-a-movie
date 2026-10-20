import { Component, OnChanges, SimpleChanges, ChangeDetectionStrategy, input, InputSignal, WritableSignal, signal } from '@angular/core';
import { Movie } from '../../../../classes/movie';
import { environment } from '../../../../../environments/environment.development';
import { faGlobe, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faImdb } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-movie-overview-infotable',
  standalone: false,
  templateUrl: './movie-overview-infotable.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movie-overview-infotable.scss',
})
export class MovieOverviewInfotable implements OnChanges {

  public movieInfoTitle: WritableSignal<string> = signal('Movie Info');

  public originalTitleText: WritableSignal<string> = signal('Original Title:');

  public genresText: WritableSignal<string> = signal('Genres:');
  public genreText: WritableSignal<string> = signal('Genre:');

  public productionCompaniesText: WritableSignal<string> = signal('Production Companies:');
  public productionCompanyText: WritableSignal<string> = signal('Production Company:');

  public productionCountriesText: WritableSignal<string> = signal('Production Countries:');
  public productionCountryText: WritableSignal<string> = signal('Production Country:');

  public languagesText: WritableSignal<string> = signal('Languages:');
  public languageText: WritableSignal<string> = signal('Language:');

  public releaseDateText: WritableSignal<string> = signal('Release Date:');
  public movieReleaseDate: WritableSignal<Date> = signal(new Date());

  public runtimeText: WritableSignal<string> = signal('Runtime:');

  public budgetText: WritableSignal<string> = signal('Budget:');
  public usdText: WritableSignal<string> = signal('USD');
  public boxOfficeText: WritableSignal<string> = signal('Box Office:');

  public movieImdb: WritableSignal<string> = signal('');
  public imdbIcon: IconDefinition = faImdb;
  public imdbText: WritableSignal<string> = signal('IMDB');

  public movieOfficialWebsite: WritableSignal<string> = signal('');
  public globeIcon: IconDefinition = faGlobe;
  public officialWebsiteText: WritableSignal<string> = signal('Official website');

  movie: InputSignal<Movie> = input.required<Movie>();

  ngOnChanges(changes: SimpleChanges): void {
    this.setReleaseDate();
    this.setMovieIMDB();
    this.setMovieOfficialWebsite();
  }

  private setReleaseDate(): void {
    if (this.movie().release_date) {
      this.movieReleaseDate.set(new Date(this.movie().release_date));
    }
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
