import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../services/movie-service';
import { LoadingService } from '../../../services/loading-service';
import { TitleService } from '../../../services/title-service';
import { Movie } from '../../../classes/movie';
import { Subscription } from 'rxjs';
import { ResponseMovieResult } from '../../../classes/response-search-movie/response-movie-result';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../../services/local-storage-service';

@Component({
  selector: 'app-movie-similar',
  standalone: false,
  templateUrl: './movie-similar.html',
  styleUrl: './movie-similar.scss',
})
export class MovieSimilar implements OnInit, OnDestroy {

  private activatedRoute = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private localStorageService = inject(LocalStorageService);
  private titleService = inject(TitleService);
  private loadingService = inject(LoadingService);

  public id: number = 0;

  public movie: Movie = null;
  public movieResults: ResponseMovieResult[] = null;

  public movieSimilarError: boolean = false;
  public errorMessage: string = '';

  private endLoadingSubscription: Subscription = new Subscription();
  private activatedRouteParentSubscription: Subscription = new Subscription();
  private getMovieSimilarSubscription: Subscription = new Subscription();

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
      this.getSimilarMovies();
    });
  }

  private setTitle() {
    const formattedTitle: string = this.movieService.getFormattedMovieTitle(
      this.movie.title, this.movie.original_title, this.movie.release_date
    );
    this.titleService.setMovieSimilarTitle(formattedTitle);
  }

  private getSimilarMovies(): void {
    this.movieSimilarError = false;
    this.getMovieSimilarSubscription = this.movieService.getMovieSimilarMovies(this.id).subscribe({
      next: (response) => {
        this.movieResults = response.results;
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {

      }
    });
  }

  private handleError(error: HttpErrorResponse) {
    this.movieSimilarError = true;
    this.errorMessage = error.message;
  }

  public reloadSimularMovies(event: boolean): void {
    this.getSimilarMovies();
  }

  ngOnDestroy(): void {
    if (this.endLoadingSubscription) {
      this.endLoadingSubscription.unsubscribe();
    }
    if (this.activatedRouteParentSubscription) {
      this.activatedRouteParentSubscription.unsubscribe();
    }
    if (this.getMovieSimilarSubscription) {
      this.getMovieSimilarSubscription.unsubscribe();
    }
  }

}
