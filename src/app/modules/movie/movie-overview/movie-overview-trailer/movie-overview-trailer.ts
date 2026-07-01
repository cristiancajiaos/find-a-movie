import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ResponseVideo } from '../../../../classes/response-video';
import { ResponseVideoResult } from '../../../../classes/response-video/response-video-result';
import { environment } from '../../../../../environments/environment.development';
@Component({
  selector: 'app-movie-overview-trailer',
  standalone: false,
  templateUrl: './movie-overview-trailer.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movie-overview-trailer.scss',
})
export class MovieOverviewTrailer implements OnChanges {

  public movieTrailerUrl: string = '';

  @Input() responseVideo: ResponseVideo = new ResponseVideo();

  public loadingTrailer: boolean = false;
  public movieTrailerFound: boolean = false;

  public movieTrailerKey: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.setMovieTrailer();
  }

  private setMovieTrailer(): void {
    if (this.responseVideo.results.length == 0) {
      return;
    }
    const responseVideoResult: ResponseVideoResult = this.responseVideo.results
      .filter((responseVideoResult) => responseVideoResult.type == 'Trailer')
      .slice(0, 1)[0];

    if (responseVideoResult) {
      this.movieTrailerFound = true;
    } else {
      return;
    }

    const key: string = responseVideoResult.key;
    this.movieTrailerKey = responseVideoResult.key ? responseVideoResult.key : '';
    this.movieTrailerUrl = `${environment.youtubeEmbedUrl}${key}`;
  }
}
