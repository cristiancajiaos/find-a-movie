import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../classes/movie';
import { Credits } from '../../classes/credits';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-movie-overview',
  standalone: false,
  templateUrl: './movie-overview.html',
  styleUrl: './movie-overview.scss'
})
export class MovieOverview implements OnInit, OnDestroy {

  public id: number = 0;
  public movie: Movie = new Movie();
  public credits: Credits = new Credits();

  public loadingMovie: boolean = false;
  public movieFound: boolean = false;
  public movieError: boolean = false;
  public errorMessage: string = '';

  public loadingCredits: boolean = false;

  public activatedRouteParentSubscription: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {

  }

  ngOnInit(): void {
    this.setId();
  }

  private setId(): void {
    this.movieError = false;
    this.loadingMovie = true;
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.getMovie();
      // this.getCredits();
    });
  }

  private getMovie() {
    this.loadingMovie = true;
    this.movieService.getMovie(this.id).then(movie => {
      this.movie = movie;
      this.movieFound = true;
    }).catch((error: HttpErrorResponse) => {
      this.handleError(error);
    }).finally(() => {
      this.loadingMovie = false;
    });

  }

  private handleError(error: HttpErrorResponse): void {
    this.movieError = true;
    this.errorMessage = error.message;
  }

  public reloadMovieOverview(event: boolean) {
    this.getMovie();
  }

  private getCredits() {
    this.loadingCredits = true;
    this.movieService.getMovieCredits(this.id).then(credits => {
      this.credits = credits;
    }).catch(error => {

    }).finally(() => {
      this.loadingCredits = false;
    });

  }

  ngOnDestroy(): void {
    this.activatedRouteParentSubscription?.unsubscribe();
  }

}
