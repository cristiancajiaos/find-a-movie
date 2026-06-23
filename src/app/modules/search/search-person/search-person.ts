import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faSearch, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ResponseSearchPerson } from '../../../classes/response-search-person';
import { ResponsePersonResult } from '../../../classes/response-search-person/response-person-result';
import { SearchService } from '../../../services/search-service';
import { TitleService } from '../../../services/title-service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingService } from '../../../services/loading-service';

@Component({
  selector: 'app-search-person',
  standalone: false,
  templateUrl: './search-person.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-person.scss',
})
export class SearchPerson implements OnInit, OnDestroy {

  private activatedRoute = inject(ActivatedRoute);
  private searchService = inject(SearchService);
  private titleService = inject(TitleService);
  private loadingService = inject(LoadingService);

  public searchIcon: IconDefinition = faSearch;
  public userIcon: IconDefinition = faUser;

  public bgImage: string = 'img/bg/bg_generic_2.jpg';

  public searchQuery: string = '';
  public currentPage: number = 1;
  public itemsPerPage: number = 20;
  public totalResults: number = 0;

  public currentPageStart: number = 0;
  public currentPageEnd: number = 0;

  public responseSearchPerson: ResponseSearchPerson = new ResponseSearchPerson();
  public personResults: ResponsePersonResult[] = [];

  public displayMode: string = 'grid';

  public loadingPage: boolean = false;

  public noResults: boolean = false;
  public searchError: boolean = false;
  public errorMessage: string = '';

  @ViewChild('header') header!: ElementRef;

  private routeSubscription: Subscription = new Subscription();
  private getPersonSubscription: Subscription = new Subscription();
  private getPersonChangePageSubscription: Subscription = new Subscription();
  private endLoadingSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe((params) => {
      this.searchQuery = params['searchQuery'];
      this.setSearchPersonTitle(this.searchQuery);
      this.searchPerson();
    });
    this.endLoadingSubscription = this.loadingService.isEndLoading.subscribe((bool) => {
      this.setSearchPersonTitle(this.searchQuery);
    });
  }

  public searchPerson(): void {
    this.searchError = false;
    this.getPersonSubscription = this.searchService.searchPerson(this.searchQuery).subscribe({
      next: (response) => {
        this.handlePersonResults(response);
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {
      },
    });
  }

  public changePage(page: number) {
    this.searchPersonUpdatePage(page);
    this.header.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  public searchPersonUpdatePage(page: number) {
    this.searchError = false;
    this.getPersonChangePageSubscription = this.searchService.searchPerson(this.searchQuery, page).subscribe({
      next: (response) => {
        this.handlePersonResults(response);
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {
      }
    });
  }

  private handlePersonResults(responseSearchPerson: ResponseSearchPerson): void {
    this.responseSearchPerson = responseSearchPerson;
    this.personResults = responseSearchPerson.results;
    this.totalResults = responseSearchPerson.total_results;
    this.currentPage = responseSearchPerson.page;
    this.calculatePageLimits();
    this.noResults = this.personResults.length == 0;
  }

  private calculatePageLimits(): void {
    this.currentPageStart = 1 + (this.currentPage - 1) * this.itemsPerPage;
    this.currentPageEnd =
      this.totalResults - this.currentPage * this.itemsPerPage > 0
        ? this.currentPage * this.itemsPerPage
        : this.totalResults;
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
    if (this.getPersonSubscription) {
      this.getPersonSubscription.unsubscribe();
    }
    if (this.getPersonChangePageSubscription) {
      this.getPersonChangePageSubscription.unsubscribe();
    }
    if (this.endLoadingSubscription) {
      this.endLoadingSubscription.unsubscribe();
    }
  }
}
