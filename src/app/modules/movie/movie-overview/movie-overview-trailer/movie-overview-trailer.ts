import { Component, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MovieService } from '../../../../services/movie-service';
import { ResponseVideo } from '../../../../classes/response-video';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseVideoResult } from '../../../../classes/response-video/response-video-result';
import { environment } from '../../../../../environments/environment.development';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-movie-overview-trailer',
  standalone: false,
  templateUrl: './movie-overview-trailer.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movie-overview-trailer.scss',
})
export class MovieOverviewTrailer implements OnChanges, OnDestroy {

  private movieService = inject(MovieService);

  @Input() movieId: number = 0;

  public movieTrailerUrl: string = '';

  public responseVideo: ResponseVideo = new ResponseVideo();

  public loadingTrailer: boolean = false;
  public movieTrailerFound: boolean = false;
  public movieTrailerError: boolean = false;
  public movieTrailerErrorMessage: string = '';
  public movieTrailerKey: string = '';

  private getMovieTrailerSubscription: Subscription;

  ngOnChanges(changes: SimpleChanges): void {
    this.getVideo();
  }

  private getVideo(): void {
    this.loadingTrailer = true;
    this.getMovieTrailerSubscription = this.movieService.getMovieVideos(this.movieId).subscribe({
      next: (responseVideo) => {
        this.responseVideo = responseVideo;
        this.setMovieTrailer();
      },
      error: (error) => {
        this.handleTrailerError(error);
      },
      complete: () => {
        this.loadingTrailer = false;
      }
    });
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

  private handleTrailerError(error: HttpErrorResponse): void {
    this.movieTrailerError = true;
    this.movieTrailerErrorMessage = error.message;
  }

  ngOnDestroy(): void {
    if (this.getMovieTrailerSubscription) {
      this.getMovieTrailerSubscription.unsubscribe();
    }
  }
}
