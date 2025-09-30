import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../classes/movie';
import { Credits } from '../../classes/credits';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../services/local-storage-service';

@Component({
  selector: 'app-movie-overview',
  standalone: false,
  templateUrl: './movie-overview.html',
  styleUrl: './movie-overview.scss',
})
export class MovieOverview implements OnInit, OnDestroy {
  public id: number = 0;

  public movie: Movie = new Movie();
  public credits: Credits = new Credits();
  public movieReleaseDate: Date = new Date();
  public movieIMDB: string = '';
  public movieHomepage: string = '';

  public loadingMovie: boolean = false;
  public movieFound: boolean = false;
  public movieOverviewError: boolean = false;
  public errorMessage: string = '';

  public loadingCredits: boolean = false;
  public movieCreditsFound: boolean = false;
  public movieCreditsError: boolean = false;
  public movieCreditsErrorMessage: string = '';

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
    } else {
      this.movieService
        .getMovie(this.id)
        .then((movie) => {
          this.movie = movie;
          this.movieFound = true;
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

  private handleError(error: HttpErrorResponse): void {
    this.movieOverviewError = true;
    this.errorMessage = error.message;
  }

  private handleCreditsError(error: HttpErrorResponse): void {
    this.movieCreditsError = true;
    this.movieCreditsErrorMessage = error.message;
  }

  public reloadMovieOverview(event: boolean) {
    this.getMovie();
  }

  ngOnDestroy(): void {
    this.activatedRouteParentSubscription?.unsubscribe();
  }
}
