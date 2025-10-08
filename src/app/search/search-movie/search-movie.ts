import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  public currentPage: number = 1;
  public itemsPerPage: number = 20;
  public totalResults: number = 0;

  public currentPageStart: number = 0;
  public currentPageEnd: number = 0;

  public responseSearchMovie: ResponseSearchMovie = new ResponseSearchMovie();
  public movieResults: ResponseMovieResult[] = [];

  public displayMode: string = 'grid';

  public loadingSearchMovie: boolean = false;
  public loadingPage: boolean = false;

  public noResults: boolean = false;
  public searchError: boolean = false;
  public errorMessage: string = '';

  @ViewChild('header') header!: ElementRef;

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

  public changePage(page: number) {
    this.searchMovieUpdatePage(page);
    this.header.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  public searchMovieUpdatePage(page: number) {
    this.searchError = false;
    this.loadingSearchMovie = true;
    this.searchService.searchMovie(this.searchQuery, page)
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
    this.totalResults = responseSearchMovie.total_results;
    this.currentPage = responseSearchMovie.page;
    this.calculatePageLimits();
    if (this.movieResults.length == 0) {
      this.noResults = true;
    }
  }

  private calculatePageLimits(): void {
    this.currentPageStart = 1 + (this.currentPage - 1) * this.itemsPerPage;
    this.currentPageEnd = ((this.totalResults - (this.currentPage * this.itemsPerPage)) > 0) ? this.currentPage * this.itemsPerPage : this.totalResults;
  }

  private handleError(error: HttpErrorResponse) {
    this.searchError = true;
    this.errorMessage = error.message;
  }

  public changeDisplay(display: string) {
    this.displayMode = display;
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
