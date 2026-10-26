import { Component, OnInit, ChangeDetectionStrategy, inject, InputSignal, input, WritableSignal, signal } from '@angular/core';
import { ResponseMovieResult } from '../../../classes/response-search-movie/response-movie-result';
import { environment } from '../../../../environments/environment.development';
import { MovieService } from '../../../services/movie-service';

@Component({
  selector: 'app-search-movie-result-grid',
  standalone: false,
  templateUrl: './search-movie-result-grid.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-movie-result-grid.scss'
})
export class SearchMovieResultGrid implements OnInit {

  private movieService = inject(MovieService);

  public posterSizeSmall: WritableSignal<string> = signal('');
  public formattedTitle: WritableSignal<string> = signal('');
  public altPosterText: WritableSignal<string> = signal('');

  movieResult: InputSignal<ResponseMovieResult> = input.required<ResponseMovieResult>();

  ngOnInit(): void {
    this.setTitle();
    this.setPoster();
  }

  public setTitle(): void {
    this.formattedTitle.set(this.movieService.getFormattedMovieTitle(
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
