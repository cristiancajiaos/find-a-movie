import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../../classes/movie';
import { environment } from '../../../../environments/environment.development';
import { faGlobe, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faImdb } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-movie-overview-infotable',
  standalone: false,
  templateUrl: './movie-overview-infotable.html',
  styleUrl: './movie-overview-infotable.scss',
})
export class MovieOverviewInfotable implements OnInit {

  public imdbIcon: IconDefinition = faImdb
  public globeIcon: IconDefinition = faGlobe;

  @Input() movie: Movie = new Movie();

  public movieReleaseDate: Date = new Date();
  public movieIMDB: string = '';
  public movieHomepage: string = '';

  ngOnInit(): void {
    this.setReleaseDate();
    this.setMovieIMDB();
    this.setMovieHomepage();
  }

  private setReleaseDate(): void {
    if (this.movie.release_date) {
      this.movieReleaseDate = new Date(this.movie.release_date);
    }
  }

  private setMovieIMDB(): void {
    if (this.movie.imdb_id) {
      this.movieIMDB = `${environment.imdbMovieUrl}${this.movie.imdb_id}/`;
    }
  }

  private setMovieHomepage(): void {
    if (this.movie.homepage) {
      this.movieHomepage = `${this.movie.homepage}`;
    }
  }
}
