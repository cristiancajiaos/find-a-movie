import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../classes/movie';
import { Credits } from '../../classes/credits';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseVideo } from '../../classes/response-video';
import { faImdb, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../../services/local-storage-service';
import { CrewMember } from '../../classes/credits/crew-member';
import { environment } from '../../../environments/environment.development';
import { ResponseVideoResult } from '../../classes/response-video/response-video-result';

@Component({
  selector: 'app-movie-overview',
  standalone: false,
  templateUrl: './movie-overview.html',
  styleUrl: './movie-overview.scss',
})
export class MovieOverview implements OnInit, OnDestroy {
  public imdbIcon: IconDefinition = faImdb;
  public globeIcon: IconDefinition = faGlobe;

  public id: number = 0;

  public movie: Movie = new Movie();
  public credits: Credits = new Credits();
  public responseVideo: ResponseVideo = new ResponseVideo();
  public movieReleaseDate: Date = new Date();
  public movieIMDB: string = '';
  public movieHomepage: string = '';

  public direction: CrewMember[] = [];
  public writing: CrewMember[] = [];
  public story: CrewMember[] = [];
  public basedOnWorkBy: CrewMember[] = [];
  public producing: CrewMember[] = [];
  public executiveProducing: CrewMember[] = [];

  public movieTrailerUrl: string = '';
  public movieDefaultUrl: string = '';

  public loadingMovie: boolean = false;
  public movieFound: boolean = false;
  public movieOverviewError: boolean = false;
  public errorMessage: string = '';

  public loadingCredits: boolean = false;
  public movieCreditsFound: boolean = false;
  public movieCreditsError: boolean = false;
  public movieCreditsErrorMessage: string = '';

  public loadingTrailer: boolean = false;
  public movieTrailerFound: boolean = false;
  public movieTrailerError: boolean = false;
  public movieTrailerErrorMessage: string = '';

  public activatedRouteParentSubscription: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.setId();
  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(
      (params) => {
        this.id = parseInt(params['id']);
        this.getMovie();
        this.getCredits();
        this.getVideo();
      }
    );
  }

  private getMovie() {
    this.movieOverviewError = false;
    this.loadingMovie = true;

    const localMovie: Movie = this.localStorageService.getItem('movie');

    if (localMovie) {
      this.movie = localMovie;
      this.loadingMovie = false;
      this.setReleaseDate();
      this.setMovieIMDB();
      this.setMovieHomepage();
    } else {
      this.movieService
        .getMovie(this.id)
        .then((movie) => {
          this.movie = movie;
          this.movieFound = true;
          this.setReleaseDate();
          this.setMovieIMDB();
          this.setMovieHomepage();
        })
        .catch((error: HttpErrorResponse) => {
          this.handleError(error);
        })
        .finally(() => {
          this.loadingMovie = false;
        });
    }
  }

  private getCredits() {
    this.loadingCredits = true;
    this.movieService
      .getMovieCredits(this.id)
      .then((credits) => {
        this.credits = credits;
        this.movieCreditsFound = true;
      })
      .catch((error: HttpErrorResponse) => {
        this.handleCreditsError(error);
      })
      .finally(() => {
        this.loadingCredits = false;
      });
  }

  private getVideo(): void {
    this.loadingTrailer = true;
    this.movieService
      .getMovieVideos(this.id)
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

  private setReleaseDate(): void {
    if (this.movie.release_date) {
      this.movieReleaseDate = new Date(this.movie.release_date);
    }
  }

  private setMovieIMDB(): void {
    if (this.movie.imdb_id) {
      this.movieIMDB = `${environment.imdbMovieUrl}${this.movie.imdb_id}/`;
    }
  }

  private setMovieHomepage(): void {
    if (this.movie.homepage) {
      this.movieHomepage = `${this.movie.homepage}`;
    }
  }

  private setMovieTrailer(): void {
    if (this.responseVideo.results.length > 0) {
        this.movieTrailerFound = true;
    } else {
      return;
    }
    const responseVideoResult: ResponseVideoResult = this.responseVideo.results.filter(responseVideoResult => responseVideoResult.type == 'Trailer').slice(0,1)[0];
    const key: string = responseVideoResult.key;
    this.movieTrailerUrl = `${environment.youtubeEmbedUrl}${key}`;
  }

  private handleError(error: HttpErrorResponse): void {
    this.movieOverviewError = true;
    this.errorMessage = error.message;
  }

  private handleCreditsError(error: HttpErrorResponse): void {
    this.movieCreditsError = true;
    this.movieCreditsErrorMessage = error.message;
  }

  private handleTrailerError(error: HttpErrorResponse): void {
    this.movieTrailerError = true;
    this.movieTrailerErrorMessage = error.message;
  }

  public reloadMovieOverview(event: boolean) {
    this.getMovie();
  }

  ngOnDestroy(): void {
    this.activatedRouteParentSubscription?.unsubscribe();
  }
}
