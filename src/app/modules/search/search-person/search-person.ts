import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy, inject, signal, WritableSignal } from '@angular/core';
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

  public searchQuery: WritableSignal<string> = signal('');
  public currentPage: WritableSignal<number> = signal(1);
  public itemsPerPage: WritableSignal<number> = signal(20);
  public totalResults: WritableSignal<number> = signal(0);

  public currentPageStart: WritableSignal<number> = signal(0);
  public currentPageEnd: WritableSignal<number> = signal(0);

  public responseSearchPerson: ResponseSearchPerson = new ResponseSearchPerson();
  public personResults: ResponsePersonResult[] = [];

  public displayMode = signal('grid');

  public loadingPage: boolean = false;

  public noResults: boolean = false;
  public searchError: boolean = false;
  public errorMessage: string = '';

  @ViewChild('header') header!: ElementRef;

  private routeSubscription: Subscription = new Subscription();
  private getPersonSubscription: Subscription = new Subscription();
  private getPersonChangePageSubscription: Subscription = new Subscription();
  private endLoadingSubscription: Subscription = new Subscription();
  private queryParamSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe((params) => {
      this.searchQuery.set(params['searchQuery']);
      this.setSearchPersonTitle();
    });
    this.queryParamSubscription = this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams['displayMode']) {
        this.displayMode.set(queryParams['displayMode']);
      }
      if (queryParams['page']) {
        this.currentPage.set(parseInt(queryParams['page']));
        this.searchPersonUpdatePage();
      } else {
        this.searchPerson();
      }
    });
    this.endLoadingSubscription = this.loadingService.isEndLoading.subscribe((bool) => {
      this.setSearchPersonTitle();
    });
  }

  public searchPerson(): void {
    this.searchError = false;
    this.getPersonSubscription = this.searchService.searchPerson(this.searchQuery()).subscribe({
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
    this.currentPage.set(page);
    this.searchPersonUpdatePage();
    this.header.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  public searchPersonUpdatePage() {
    this.searchError = false;
    this.getPersonChangePageSubscription = this.searchService.searchPerson(this.searchQuery(), this.currentPage()).subscribe({
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
    this.totalResults.set(responseSearchPerson.total_results);
    this.currentPage.set(responseSearchPerson.page);
    this.calculatePageLimits();
    this.noResults = this.personResults.length == 0;
  }

  private calculatePageLimits(): void {
    this.currentPageStart.set(1 + (this.currentPage() - 1) * this.itemsPerPage());
    this.currentPageEnd.set(
      this.totalResults() - this.currentPage() * this.itemsPerPage() > 0
        ? this.currentPage() * this.itemsPerPage()
        : this.totalResults());
  }

  private handleError(error: HttpErrorResponse): void {
    this.searchError = true;
    this.errorMessage = error.message;
  }

  public changeDisplay(display: string) {
    this.displayMode.set(display);
  }

  private setSearchPersonTitle() {
    this.titleService.setTitle(`Search Person: ${this.searchQuery()}`);
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
    if (this.queryParamSubscription) {
      this.queryParamSubscription.unsubscribe();
    }
  }
}
