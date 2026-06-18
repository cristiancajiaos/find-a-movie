import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../../../services/movie-service';
import { Movie } from '../../../classes/movie';
import { Credits } from '../../../classes/credits';
import { HttpErrorResponse } from '@angular/common/http';
import { TitleService } from '../../../services/title-service';

@Component({
  selector: 'app-movie-overview',
  standalone: false,
  templateUrl: './movie-overview.html',
  styleUrl: './movie-overview.scss',
})
export class MovieOverview implements OnInit, OnDestroy {
  public id: number = 0;

  public movie: Movie = null;
  public credits: Credits = new Credits();
  public movieReleaseDate: Date = new Date();
  public movieIMDB: string = '';
  public movieHomepage: string = '';

  public movieFound: boolean = false;
  public movieOverviewError: boolean = false;
  public errorMessage: string = '';

  public movieTagline: string = null;
  public movieOverview: string = null;

  public movieCreditsFound: boolean = false;
  public movieCreditsError: boolean = false;
  public movieCreditsErrorMessage: string = '';

  public activatedRouteParentSubscription: Subscription | undefined;
  private getMovieSubscription: Subscription;
  private getMovieCreditsSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private titleService: TitleService,
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
      },
    );
  }

  private getMovie() {
    this.movie = null;
    this.movieTagline = null;
    this.movieOverview = null;
    this.movieOverviewError = false;

    this.getMovieSubscription = this.movieService.getMovie(this.id).subscribe({
        next: (movie) => {
          this.movie = movie;
          this.movieFound = true;
        },
        error: (error) => {
          this.handleError(error);
        },
        complete: () => {
          this.setTitle();
          this.setDescription();
        },
      });
  }

  private getCredits() {
    this.getMovieCreditsSubscription = this.movieService.getMovieCredits(this.id).subscribe({
      next: (credits) => {
        this.credits = credits;
        this.movieCreditsFound = true;
      },
      error: (error) => {
        this.handleCreditsError(error);
      },
      complete: () => {
      },
    });
  }

  private setTitle(): void {
    const formattedTitle: string = this.movieService.getFormattedMovieTitle(
      this.movie.title,
      this.movie.original_title,
      this.movie.release_date,
    );
    this.titleService.setMovieOverviewTitle(formattedTitle);
  }

  private setDescription() {
    this.movieTagline = this.movie.tagline;
    this.movieOverview = this.movie.overview;
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
    if (this.getMovieSubscription) {
      this.getMovieSubscription.unsubscribe();
    }
    if (this.getMovieCreditsSubscription) {
      this.getMovieCreditsSubscription.unsubscribe();
    }
  }
}
