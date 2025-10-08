import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faSearch, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ResponseSearchPerson } from '../../classes/response-search-person';
import { ResponsePersonResult } from '../../classes/response-search-person/response-person-result';
import { SearchService } from '../../services/search-service';
import { TitleService } from '../../services/title-service';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchMovie } from '../search-movie/search-movie';

@Component({
  selector: 'app-search-person',
  standalone: false,
  templateUrl: './search-person.html',
  styleUrl: './search-person.scss'
})
export class SearchPerson implements OnInit, OnDestroy {

  public searchIcon: IconDefinition = faSearch;
  public userIcon: IconDefinition = faUser;

  public searchQuery: string = '';
  public currentPage: number = 1;
  public itemsPerPage: number = 20;
  public totalResults: number = 0;

  public currentPageStart: number = 0;
  public currentPageEnd: number = 0;

  public responseSearchPerson: ResponseSearchPerson = new ResponseSearchPerson();
  public personResults: ResponsePersonResult[] = [];

  public displayMode: string = 'grid';

  public loadingSearchPerson: boolean = false;
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
      this.setSearchPersonTitle(this.searchQuery);
      this.searchPerson();
    });
  }

  public searchPerson(): void {
    this.searchError = false;
    this.loadingSearchPerson = true;
    this.searchService.searchPerson(this.searchQuery)
    .then(responseSearchPerson => {
      this.handlePersonResults(responseSearchPerson);
    })
    .catch((error: HttpErrorResponse) => {
      this.handleError(error);
    })
    .finally(() => {
      this.loadingSearchPerson = false;
    });
  }

  private handlePersonResults(responseSearchPerson: ResponseSearchPerson): void {
    this.responseSearchPerson = responseSearchPerson;
    this.personResults = responseSearchPerson.results;
    this.totalResults = responseSearchPerson.total_results;
    this.currentPage = responseSearchPerson.page;
    this.calculatePageLimits();
    this.noResults = (this.personResults.length == 0);
  }

  private calculatePageLimits(): void {
    this.currentPageStart = 1 + (this.currentPage - 1) * this.itemsPerPage;
    this.currentPageEnd = ((this.totalResults - (this.currentPage * this.itemsPerPage)) > 0) ? this.currentPage * this.itemsPerPage : this.totalResults;
  }

  private handleError(error: HttpErrorResponse): void {
    this.searchError = true;
    this.errorMessage = error.message;
  }

  public changeDisplay(display: string) {
    this.displayMode = display;
  }

  private setSearchPersonTitle(query: string) {
    this.titleService.setTitle(`Search Person: ${query}`);
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

}
