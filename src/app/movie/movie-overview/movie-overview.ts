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

  public loadingMovie: boolean = false;
  public movieFound: boolean = false;
  public movieError: boolean = false;
  public errorMessage: string = '';


  public loadingCredits: boolean = false;
  public loadingVideo: boolean = false;

  public activatedRouteParentSubscription: Subscription | undefined;

  constructor(private activatedRoute: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    this.setId();
  }

  private setId(): void {
    this.movieError = false;
    this.loadingMovie = true;
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
    this.loadingMovie = true;
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

  private getCredits() {
    this.loadingCredits = true;
    this.movieService
      .getMovieCredits(this.id)
      .then((credits) => {
        this.credits = credits;
      })
      .catch((error) => {})
      .finally(() => {
        this.loadingCredits = false;
      });
  }

  private getVideo(): void {
    this.loadingVideo = true;
    this.movieService
      .getMovieVideos(this.id)
      .then((responseVideo) => {
        this.responseVideo = responseVideo;
      })
      .catch((error) => {})
      .finally(() => {
        this.loadingVideo = false;
      });
  }

  private setReleaseDate(): void {
    if (this.movie.release_date) {
      this.movieReleaseDate = new Date(this.movie.release_date);
    }
  }

  private setMovieIMDB(): void {
    if (this.movie.imdb_id) {
       this.movieIMDB = `https://www.imdb.com/title/${this.movie.imdb_id}/`;
    }
  }

  private setMovieHomepage(): void {
    if (this.movie.homepage) {
      this.movieHomepage = `${this.movie.homepage}`;
    }
  }


  private handleError(error: HttpErrorResponse): void {
    this.movieError = true;
    this.errorMessage = error.message;
  }

  public reloadMovieOverview(event: boolean) {
    this.getMovie();
  }

  ngOnDestroy(): void {
    this.activatedRouteParentSubscription?.unsubscribe();
  }
}
