import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie-service';
import { ResponseVideo } from '../../../classes/response-video';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseVideoResult } from '../../../classes/response-video/response-video-result';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-movie-overview-trailer',
  standalone: false,
  templateUrl: './movie-overview-trailer.html',
  styleUrl: './movie-overview-trailer.scss',
})
export class MovieOverviewTrailer implements OnInit {
  @Input() movieId: number = 0;

  public movieTrailerUrl: string = '';

  public responseVideo: ResponseVideo = new ResponseVideo();

  public loadingTrailer: boolean = false;
  public movieTrailerFound: boolean = false;
  public movieTrailerError: boolean = false;
  public movieTrailerErrorMessage: string = '';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getVideo();
  }

  private getVideo(): void {
    this.loadingTrailer = true;
    this.movieService
      .getMovieVideos(this.movieId)
      .then((responseVideo) => {
        this.responseVideo = responseVideo;
        this.setMovieTrailer();
      })
      .catch((error: HttpErrorResponse) => {
        this.handleTrailerError(error);
      })
      .finally(() => {
        this.loadingTrailer = false;
      });
  }

  private setMovieTrailer(): void {
    if (this.responseVideo.results.length > 0) {
      this.movieTrailerFound = true;
    } else {
      return;
    }
    const responseVideoResult: ResponseVideoResult = this.responseVideo.results
      .filter((responseVideoResult) => responseVideoResult.type == 'Trailer')
      .slice(0, 1)[0];
    const key: string = responseVideoResult.key;
    this.movieTrailerUrl = `${environment.youtubeEmbedUrl}${key}`;
  }

  private handleTrailerError(error: HttpErrorResponse): void {
    this.movieTrailerError = true;
    this.movieTrailerErrorMessage = error.message;
  }
}
