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

  responseVideo: InputSignal<ResponseVideoResult> = input<ResponseVideoResult>();

  public trailerTitle: WritableSignal<string> = signal('Trailer');

  ngOnChanges(changes: SimpleChanges): void {
    this.setMovieTrailer();
  }

  private setMovieTrailer(): void {
    if (this.responseVideo()) {
      const key: string = this.responseVideo().key;
      this.movieTrailerKey.set(this.responseVideo().key ? this.responseVideo().key : '');
      this.movieTrailerUrl.set(`${environment.youtubeEmbedUrl}${key}`);
    }
  }
}
