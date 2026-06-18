import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFilm, faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { SearchService } from '../../../services/search-service';
import { TitleService } from '../../../services/title-service';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseSearchMovie } from '../../../classes/response-search-movie';
import { ResponseMovieResult } from '../../../classes/response-search-movie/response-movie-result';
import { LoadingService } from '../../../services/loading-service';

@Component({
  selector: 'app-search-movie',
  standalone: false,
  templateUrl: './search-movie.html',
  styleUrl: './search-movie.scss',
})
export class SearchMovie implements OnInit, OnDestroy {
  public searchIcon: IconDefinition = faSearch;
  public movieIcon: IconDefinition = faFilm;

  public bgImage: string = 'img/bg/bg_generic_1.jpg';

  public searchQuery: string = '';
  public currentPage: number = 1;
  public itemsPerPage: number = 20;
  public totalResults: number = 0;

  public currentPageStart: number = 0;
  public currentPageEnd: number = 0;

  public responseSearchMovie: ResponseSearchMovie = new ResponseSearchMovie();
  public movieResults: ResponseMovieResult[] = [];

  public displayMode: string = 'grid';

  public loadingPage: boolean = false;

  public noResults: boolean = false;
  public searchError: boolean = false;
  public errorMessage: string = '';

  @ViewChild('header') header!: ElementRef;

  private routeSubscription?: Subscription = new Subscription();
  private getMovieSubscription: Subscription = new Subscription();
  private getMovieChangePageSubscription: Subscription = new Subscription();
  private endLoadingSubscription: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService,
    private titleService: TitleService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe((params) => {
      this.searchQuery = params['searchQuery'];
      this.setSearchMovieTitle(this.searchQuery);
      this.searchMovie();
    });
    this.endLoadingSubscription = this.loadingService.isEndLoading.subscribe((bool) => {
      this.setSearchMovieTitle(this.searchQuery);
    });
  }

  public searchMovie(): void {
    this.searchError = false;
    this.getMovieSubscription = this.searchService.searchMovie(this.searchQuery).subscribe({
      next: (response) => {
        this.handleMovieResults(response);
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {
      }
    });
  }

  public changePage(page: number) {
    this.searchMovieUpdatePage(page);
    this.header.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  public searchMovieUpdatePage(page: number) {
    this.searchError = false;
    this.getMovieChangePageSubscription = this.searchService.searchMovie(this.searchQuery, page).subscribe({
      next: (response) => {
        this.handleMovieResults(response);
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {
      }
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
    this.currentPageEnd =
      this.totalResults - this.currentPage * this.itemsPerPage > 0
        ? this.currentPage * this.itemsPerPage
        : this.totalResults;
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
    if (this.getMovieSubscription) {
      this.getMovieSubscription.unsubscribe();
    }
    if (this.getMovieChangePageSubscription) {
      this.getMovieChangePageSubscription.unsubscribe();
    }
    if (this.endLoadingSubscription) {
      this.endLoadingSubscription.unsubscribe();
    }
  }
}
