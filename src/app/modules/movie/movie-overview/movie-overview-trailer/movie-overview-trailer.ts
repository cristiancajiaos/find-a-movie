import {
  Component,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  input,
  InputSignal,
  signal,
} from '@angular/core';
import { ResponseVideoResult } from '../../../../classes/response-video/response-video-result';
import { environment } from '../../../../../environments/environment.development';
import { WritableSignal } from '@angular/core';
@Component({
  selector: 'app-movie-overview-trailer',
  standalone: false,
  templateUrl: './movie-overview-trailer.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movie-overview-trailer.scss',
})
export class MovieOverviewTrailer implements OnChanges {

  public movieTrailerUrl: WritableSignal<string> = signal('');
  public movieTrailerKey: WritableSignal<string> = signal('');

  public movieVideos: InputSignal<ResponseVideoResult[]> = input.required<ResponseVideoResult[]>();

  public trailerTitle: WritableSignal<string> = signal('Trailer');
  public noTrailerAvailableImgText: WritableSignal<string> = signal('No trailer available');
  public noTrailerAvailableImgUrl: WritableSignal<string> = signal('img/default-images/movie_trailer_not_available.jpg');

  ngOnChanges(changes: SimpleChanges): void {
    this.setMovieTrailer();
  }

  private setMovieTrailer(): void {
    const movieTrailer: ResponseVideoResult = this.movieVideos().filter(video => {
      return video.type == 'Trailer'
    })[0];

    if (movieTrailer) {
      const key: string = movieTrailer.key;
      this.movieTrailerKey.set(movieTrailer.key ? movieTrailer.key : '');
      this.movieTrailerUrl.set(`${environment.youtubeEmbedUrl}${key}`);
    }
  }
}
