import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../services/movie-service';
import { LocalStorageService } from '../../../services/local-storage-service';
import { TitleService } from '../../../services/title-service';
import { LoadingService } from '../../../services/loading-service';
import { Movie } from '../../../classes/movie';
import { ResponseMovieResult } from '../../../classes/response-search-movie/response-movie-result';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-movie-recommendations',
  standalone: false,
  templateUrl: './movie-recommendations.html',
  styleUrl: './movie-recommendations.scss',
})
export class MovieRecommendations implements OnInit, OnDestroy {

  private activatedRoute = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private localStorageService = inject(LocalStorageService);
  private titleService = inject(TitleService);
  private loadingService = inject(LoadingService);

  public id: number = 0;

  public movie: Movie = null;
  public movieResults: ResponseMovieResult[] = null;

  public movieRecommendedError: boolean = false;
  public errorMessage: string = '';

  private activatedRouteParentSubscription: Subscription = new Subscription();
  private getMovieRecommendedSubscription: Subscription = new Subscription();
  private endLoadingSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.setId();
    this.getMovie();
    this.endLoadingSubscription = this.loadingService.isEndLoading.subscribe((bool) => {
      if (this.movie) {
        this.setTitle();
      }
    });
  }

  private getMovie(): void {
    this.movie = this.localStorageService.getItem('movie');
  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent.params?.subscribe((params) => {
      this.id = parseInt(params['id']);
      this.getRecommendedMovies();
    });
  }

  private setTitle(): void {
    const formattedTitle: string = this.movieService.getFormattedMovieTitle(
      this.movie.title, this.movie.original_title, this.movie.release_date
    );
    this.titleService.setMovieRecommendedTitle(formattedTitle);
  }

  private getRecommendedMovies(): void {
    this.movieRecommendedError = false;
    this.getMovieRecommendedSubscription = this.movieService.getMovieRecommendedMovies(this.id).subscribe({
      next: (response) => {
        this.movieResults = response.results;
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {}
    });
  }

  private handleError(error: HttpErrorResponse): void {
    this.movieRecommendedError = true;
    this.errorMessage = error.message;
  }

  public reloadRecommendedMovies(event: boolean): void {
    this.getRecommendedMovies();
  }

  ngOnDestroy(): void {
    if (this.activatedRouteParentSubscription) {
      this.activatedRouteParentSubscription.unsubscribe();
    }
    if (this.getMovieRecommendedSubscription) {
      this.getMovieRecommendedSubscription.unsubscribe();
    }
    if (this.endLoadingSubscription) {
      this.endLoadingSubscription.unsubscribe();
    }
  }

}
