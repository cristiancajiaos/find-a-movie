import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFilm, faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { SearchService } from '../../services/search-service';
import { TitleService } from '../../services/title-service';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseSearchMovie } from '../../classes/response-search-movie';
import { ResponseMovieResult } from '../../classes/response-search-movie/response-movie-result';

@Component({
  selector: 'app-search-movie',
  standalone: false,
  templateUrl: './search-movie.html',
  styleUrl: './search-movie.scss'
})
export class SearchMovie implements OnInit, OnDestroy {

  public searchIcon: IconDefinition = faSearch;
  public movieIcon: IconDefinition = faFilm;

  public searchQuery: string = '';

  public responseSearchMovie: ResponseSearchMovie = new ResponseSearchMovie();
  public movieResults: ResponseMovieResult[] = [];


  public loadingView: boolean = false;
  public loadingSearchMovie: boolean = false;

  public noResults: boolean = false;
  public searchError: boolean = false;
  public errorMessage: string = '';

  private routeSubscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService,
    private titleService: TitleService
  ) {

  }

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      this.searchQuery = params['searchQuery'];
      console.log(this.searchQuery);
      this.setSearchMovieTitle(this.searchQuery);
      this.searchMovie();
    });
  }

  public searchMovie(): void {
    this.searchError = false;
    this.loadingSearchMovie = true;
    this.searchService.searchMovie(this.searchQuery)
    .then(responseSearchMovie => {
      this.handleMovieResults(responseSearchMovie);
    }).catch((error: HttpErrorResponse) => {
      this.handleError(error);
    }).finally(() => {
      this.loadingSearchMovie = false;
    });
  }

  private handleMovieResults(responseSearchMovie: ResponseSearchMovie) {
    this.responseSearchMovie = responseSearchMovie;
    this.movieResults = responseSearchMovie.results;
    if (this.movieResults.length == 0) {
      this.noResults = true;
    }
  }

  private handleError(error: HttpErrorResponse) {
    this.searchError = true;
    this.errorMessage = error.message;
  }

  private setSearchMovieTitle(query: string) {
    this.titleService.setTitle(`Search Movie: ${query}`);
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

}
