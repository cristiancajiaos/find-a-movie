import { Component, OnInit, ChangeDetectionStrategy, InputSignal, input, OutputEmitterRef, output, WritableSignal, signal } from '@angular/core';
import { ResponseMovieResult } from '../../../../classes/response-search-movie/response-movie-result';
import { environment } from '../../../../../environments/environment.development';
import { formattedMovieTitle } from '../../../../helpers/movie-helper';


@Component({
  selector: 'app-search-input-movie-result',
  standalone: false,
  templateUrl: './search-input-movie-result.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-input-movie-result.scss'
})
export class SearchInputMovieResult implements OnInit {

  public posterBgImage: WritableSignal<Object> = signal({});
  public formattedTitle: WritableSignal<string> = signal('');

  public movieResult: InputSignal<ResponseMovieResult> = input.required<ResponseMovieResult>();
  public clickResult: OutputEmitterRef<boolean> = output<boolean>();

  ngOnInit(): void {
    this.setTitle();
    this.setPosterImg();
  }

  public setTitle() {
    this.formattedTitle.set(formattedMovieTitle(
      this.movieResult().title,
      this.movieResult().original_title,
      this.movieResult().release_date
    ));
  }

  public setPosterImg() {
    const posterImg = this.movieResult().poster_path
        ? `${environment.imgUrl}${environment.posterSizeSmall}${this.movieResult().poster_path}`
        : 'img/default-images/movie_poster_notavailable_w500.jpg';
    this.posterBgImage.set({
      'background-image':`url(${posterImg})`
    });
  }

  public onClickResult(): void {
    this.clickResult.emit(true);
  }

}
