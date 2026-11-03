import { Component, OnInit, ChangeDetectionStrategy, input, InputSignal, WritableSignal, signal } from '@angular/core';
import { ResponseMovieResult } from '../../../classes/response-search-movie/response-movie-result';
import { environment } from '../../../../environments/environment.development';
import { formattedMovieTitle } from '../../../helpers/movie-helper';

@Component({
  selector: 'app-search-movie-result-list',
  standalone: false,
  templateUrl: './search-movie-result-list.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-movie-result-list.scss',
})
export class SearchMovieResultList implements OnInit {

  public posterSizeSmall: WritableSignal<string> = signal('');
  public formattedTitle: WritableSignal<string> = signal('');
  public altPosterText: WritableSignal<string> = signal('');

  public movieResult: InputSignal<ResponseMovieResult> = input.required<ResponseMovieResult>();

  ngOnInit(): void {
    this.setTitle();
    this.setPoster();
  }

  public setTitle(): void {
    this.formattedTitle.set(formattedMovieTitle(
      this.movieResult().title,
      this.movieResult().original_title,
      this.movieResult().release_date
    ));
  }

  public setPoster(): void {
    this.posterSizeSmall.set(this.movieResult().poster_path
      ? `${environment.imgUrl}${environment.posterSizeSmall}${this.movieResult().poster_path}`
      : 'img/default-images/movie_poster_notavailable_w500.jpg');
    this.altPosterText.set(this.movieResult().poster_path
      ? `Poster from the movie ${this.formattedTitle()}`
      : `Poster from the movie ${this.formattedTitle()} is not available`);
  }

}
