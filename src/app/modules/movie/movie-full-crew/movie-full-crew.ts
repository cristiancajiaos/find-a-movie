import { Component, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy, inject, WritableSignal, signal, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../../../services/movie-service';
import { CrewMember } from '../../../classes/credits/crew-member';
import { HttpErrorResponse } from '@angular/common/http';
import { Movie } from '../../../classes/movie';
import { TitleService } from '../../../services/title-service';
import { LoadingService } from '../../../services/loading-service';
import { SessionStorageService } from '../../../services/session-storage-service';
import { ShowXResults } from '../../../components/shared/show-x-results/show-x-results';
import { Sort } from '../../../enums/sort';
import { SortCriteria } from '../../../interfaces/sort-criteria';
import { SortSelect } from '../../../components/shared/sort-select/sort-select';

@Component({
  selector: 'app-movie-full-crew',
  standalone: false,
  templateUrl: './movie-full-crew.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movie-full-crew.scss',
})
export class MovieFullCrew implements OnInit, AfterViewInit, OnDestroy {

  private activatedRoute = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private sessionStorageService = inject(SessionStorageService);
  private titleService = inject(TitleService);
  private loadingService = inject(LoadingService);

  public id: WritableSignal<number> = signal(0);

  private movie: WritableSignal<Movie> = signal(null);

  public movieFullCrew: WritableSignal<CrewMember[]> = signal([]);

  public currentPage: WritableSignal<number> = signal(1);
  public crewMembersPerPage: WritableSignal<number> = signal(25);
  public totalCrewMembers: WritableSignal<number> = signal(0);

  public movieFullCrewError: WritableSignal<boolean> = signal(false);
  public errorMessage: WritableSignal<string> = signal('');

  @ViewChild('title') title!: ElementRef;
  public fullCrewTitle: WritableSignal<string> = signal('Full Crew');

  @ViewChildren('sortSelectMovieFullCrew') sortSelectMovieFullCrew!: QueryList<SortSelect>;
  public sortCriterias: WritableSignal<SortCriteria[]> = signal([
    { id: Sort.DefaultOrder, sortCriteriaName: 'Default order' },
    { id: Sort.FirstNameAsc, sortCriteriaName: 'First name - ascending' },
    { id: Sort.FirstNameDesc, sortCriteriaName: 'First name - descending' },
    { id: Sort.LastNameAsc, sortCriteriaName: 'Last name - ascending' },
    { id: Sort.LastNameDesc, sortCriteriaName: 'Last name - descending' },
    { id: Sort.JobAsc, sortCriteriaName: 'Job - ascending' },
    { id: Sort.JobDesc, sortCriteriaName: 'Job - descending' },
  ]);
  public defaultSort: WritableSignal<SortCriteria> = signal({
    id: Sort.DefaultOrder,
    sortCriteriaName: 'Default Order',
  });
  private currentSortStr: WritableSignal<string | null> = signal(null);
  public currentSort: WritableSignal<SortCriteria> = signal(this.defaultSort());
  public enabledSortParams: WritableSignal<string> = signal('Enabled queryParams for sort: defaultOrder, nameAsc, nameDesc, lastNameAsc, lastNameDesc, jobAsc, jobDesc');

  @ViewChild('movieCrewShowXResults') movieCrewShowXResults!: ShowXResults;
  public numberResultsOptions: WritableSignal<number[]> = signal([25, 50, 100]);
  public enabledResultsParams: WritableSignal<string> = signal('Enabled queryParam resultsPerPage: 25, 50, 100 (other values are not valid)');

  public nameText: WritableSignal<string> = signal('Name');
  public jobText: WritableSignal<string> = signal('Job');

  public noRecognizableCrewText: WritableSignal<string> = signal('This movie has no recognizable cast');

  private activatedRouteParentSubscription: Subscription = new Subscription();
  private getMovieCrewSubscription: Subscription = new Subscription();
  private endLoadingSubscription: Subscription = new Subscription();
  private queryParamsSubscription: Subscription = new Subscription();
  private orderSelectSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.getMovie();
    this.setId();
    this.endLoadingSubscription = this.loadingService.isEndLoading.subscribe((bool) => {
      if (this.movie) {
        this.setTitle();
      }
    });
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams['sort']) {
        this.currentSortStr.set(queryParams['sort']);
      }
      if (queryParams['resultsPerPage']) {
        this.setResultsPerPage(parseInt(queryParams['resultsPerPage']));
      }
    });
  }

  ngAfterViewInit(): void {
    this.orderSelectSubscription = this.sortSelectMovieFullCrew.changes.subscribe((list) => {
      this.setInitialOrder();
    });
  }

  private getMovie(): void {
    this.movie.set(this.sessionStorageService.getItem('movie'));
    this.setTitle();
  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(
      (params) => {
        this.id.set(parseInt(params['id']));
        this.getFullCrew();
      },
    );
  }

  private setResultsPerPage(results: number) {
    if (this.numberResultsOptions().includes(results)) {
      this.crewMembersPerPage.set(results);
      this.movieCrewShowXResults.setXResults(results);
    }
  }

  private setInitialOrder(): void {
    let sortCriteria: SortCriteria = null;

    if (this.currentSortStr() == 'defaultValue') {
      sortCriteria = { id: Sort.DefaultOrder, sortCriteriaName: 'Default order' };
    } else if (this.currentSortStr() == 'nameAsc') {
      sortCriteria = { id: Sort.FirstNameAsc, sortCriteriaName: 'First name - ascending' };
    } else if (this.currentSortStr() == 'nameDesc') {
      sortCriteria = { id: Sort.FirstNameDesc, sortCriteriaName: 'First name - descending' };
    } else if (this.currentSortStr() == 'lastNameAsc') {
      sortCriteria = { id: Sort.LastNameAsc, sortCriteriaName: 'Last name - ascending' };
    } else if (this.currentSortStr() == 'lastNameDesc') {
      sortCriteria = { id: Sort.LastNameDesc, sortCriteriaName: 'Last name - descending' };
    } else if (this.currentSortStr() == 'jobAsc') {
      sortCriteria = { id: Sort.JobAsc, sortCriteriaName: 'Job - ascending' };
    } else if (this.currentSortStr() == 'jobDesc') {
      sortCriteria = { id: Sort.JobDesc, sortCriteriaName: 'Job - descending' };
    }

    if (this.currentSortStr() != null) {
      this.currentSort.set(sortCriteria);
    }

    if (this.sortSelectMovieFullCrew.length > 0) {
      this.sortSelectMovieFullCrew.first.setSortCriteria(sortCriteria);
    }
  }

  private setTitle(): void {
    const formattedTitle: string = this.movieService.getFormattedMovieTitle(
      this.movie().title, this.movie().original_title, this.movie().release_date
    );
    this.titleService.setMovieFullCrewTitle(formattedTitle);
  }

  private getFullCrew(): void {
    this.movieFullCrewError.set(false);
    this.getMovieCrewSubscription = this.movieService.getMovieCrew(this.id()).subscribe({
      next: (crew) => {
        this.movieFullCrew.set(crew);
        this.totalCrewMembers.set(this.movieFullCrew().length);
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {
      }
    });
  }

  private handleError(error: HttpErrorResponse): void {
    this.movieFullCrewError.set(true);
    this.errorMessage.set(error.message);
  }

  public reloadFullCrew(event: boolean): void {
    this.getFullCrew();
  }

  public sortCriteriaChange(sortCriteria: SortCriteria): void {
    this.currentSort.set(sortCriteria);
  }

  public changePage(page: number): void {
    this.currentPage.set(page);
    this.title.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  public changeItemsPerPage(itemsPerPage: number) {
    this.crewMembersPerPage.set(itemsPerPage);
    this.currentPage.set(1);
  }

  ngOnDestroy(): void {
    if (this.activatedRouteParentSubscription) {
      this.activatedRouteParentSubscription.unsubscribe();
    }
    if (this.getMovieCrewSubscription) {
      this.getMovieCrewSubscription.unsubscribe();
    }
    if (this.endLoadingSubscription) {
      this.endLoadingSubscription.unsubscribe();
    }
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
    if (this.orderSelectSubscription) {
      this.orderSelectSubscription.unsubscribe();
    }
  }
}
