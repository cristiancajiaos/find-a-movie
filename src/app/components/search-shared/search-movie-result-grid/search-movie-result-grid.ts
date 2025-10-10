import { Component, Input, OnInit } from '@angular/core';
import { ResponseMovieResult } from '../../../classes/response-search-movie/response-movie-result';
import { environment } from '../../../../environments/environment.development';
import { MovieService } from '../../../services/movie-service';

@Component({
  selector: 'app-search-movie-result-grid',
  standalone: false,
  templateUrl: './search-movie-result-grid.html',
  styleUrl: './search-movie-result-grid.scss'
})
export class SearchMovieResultGrid implements OnInit {
  public posterSizeSmall: string = '';
  public releaseYear: number = 0;
  public formattedTitle: string = '';
  public altPosterText: string = '';

  @Input() movieResult: ResponseMovieResult = new ResponseMovieResult();

  constructor(
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.setTitle();
    this.setPoster();
    this.setYear();
  }

  public setTitle(): void {
    this.formattedTitle = this.movieService.getFormattedMovieTitle(
      this.movieResult.title,
      this.movieResult.original_title,
      this.movieResult.release_date
    );
  }

  public setPoster(): void {
      this.posterSizeSmall = this.movieResult.poster_path
        ? `${environment.imgUrl}${environment.posterSizeSmall}${this.movieResult.poster_path}`
        : 'img/default-images/movie_poster_notavailable_w500.png';
      this.altPosterText = this.movieResult.poster_path
      ? `Poster from the movie ${this.formattedTitle}`
      : `Poster from the movie ${this.formattedTitle} is not available`;
    }

  public setYear(): void {
    const releaseDate: Date = new Date(this.movieResult.release_date);
    this.releaseYear = releaseDate.getFullYear();
  }

}
