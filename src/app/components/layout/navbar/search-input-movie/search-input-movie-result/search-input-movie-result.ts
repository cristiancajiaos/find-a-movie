import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ResponseMovieResult } from '../../../../../classes/response-search-movie/response-movie-result';
import { MovieService } from '../../../../../services/movie-service';
import { environment } from '../../../../../../environments/environment.development';

@Component({
  selector: 'app-search-input-movie-result',
  standalone: false,
  templateUrl: './search-input-movie-result.html',
  styleUrl: './search-input-movie-result.scss'
})
export class SearchInputMovieResult implements OnInit {

  public posterSizeSmall: string = '';
  public releaseYear: number = 0;
  public formattedTitle: string = '';

  @Input() movieResult: ResponseMovieResult;
  @Output() clickResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.setTitle();
    this.setPoster();
  }

  public setTitle() {
    this.formattedTitle = this.movieService.getFormattedMovieTitle(
      this.movieResult.title,
      this.movieResult.original_title,
      this.movieResult.release_date
    );
  }

  public setPoster() {
    this.posterSizeSmall = this.movieResult.poster_path
        ? `${environment.imgUrl}${environment.posterSizeSmall}${this.movieResult.poster_path}`
        : 'img/default-images/movie_poster_notavailable_w500.jpg';
  }

  public onClickResult(): void {
    this.clickResult.emit(true);
  }

}
