import { Component, Input, OnInit } from '@angular/core';
import { ResponseMovieResult } from '../../../classes/response-search-movie/response-movie-result';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-search-movie-result',
  standalone: false,
  templateUrl: './search-movie-result.html',
  styleUrl: './search-movie-result.scss'
})
export class SearchMovieResult implements OnInit {

  public posterSizeSmall: string = '';
  public releaseYear: number = 0;

  @Input() movieResult: ResponseMovieResult = new ResponseMovieResult();

  ngOnInit(): void {
    this.setPoster();
    this.setYear();

  }

  public setPoster(): void {
      this.posterSizeSmall = this.movieResult.poster_path
        ? `${environment.imgUrl}${environment.posterSizeSmall}${this.movieResult.poster_path}`
        : 'img/default-images/movie_poster_notavailable_w500.png';
    }

  public setYear(): void {
    const releaseDate: Date = new Date(this.movieResult.release_date);
    this.releaseYear = releaseDate.getFullYear();
  }

}
