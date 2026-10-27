import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  inject,
  WritableSignal,
  signal,
  ElementRef,
  AfterViewInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../../../services/movie-service';
import { CastMember } from '../../../classes/credits/cast-member';
import { HttpErrorResponse } from '@angular/common/http';
import { Movie } from '../../../classes/movie';
import { TitleService } from '../../../services/title-service';
import { LoadingService } from '../../../services/loading-service';
import { SessionStorageService } from '../../../services/session-storage-service';
import { ShowXResults } from '../../../components/shared/show-x-results/show-x-results';
import { SortCriteria } from '../../../interfaces/sort-criteria';
import { Sort } from '../../../enums/sort';
import { SortSelect } from '../../../components/shared/sort-select/sort-select';

@Component({
  selector: 'app-movie-cast',
  standalone: false,
  templateUrl: './movie-cast.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movie-cast.scss',
})
export class MovieCast implements OnInit, AfterViewInit, OnDestroy {

  private activatedRoute = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private sessionStorageService = inject(SessionStorageService);
  private titleService = inject(TitleService);
  private loadingService = inject(LoadingService);

  public id: WritableSignal<number> = signal(0);

  private movie: WritableSignal<Movie> = signal(null);

  public movieCast: WritableSignal<CastMember[]> = signal([]);

  public currentPage: WritableSignal<number> = signal(1);
  public totalActors: WritableSignal<number> = signal(0);

  public movieCastError: WritableSignal<boolean> = signal(false);
  public errorMessage: WritableSignal<string> = signal('');

  @ViewChild('title') title!: ElementRef;
  public castTitle: WritableSignal<string> = signal('Cast');

  @ViewChildren('sortSelectMovieCast') sortSelectMovieCast!: QueryList<SortSelect>;
  public sortCriterias: WritableSignal<SortCriteria[]> = signal([
    { id: Sort.CastOrderAsc, sortCriteriaName: 'Cast order - ascending' },
    { id: Sort.CastOrderDesc, sortCriteriaName: 'Cast order - descending' },
    { id: Sort.FirstNameAsc, sortCriteriaName: 'First name - ascending' },
    { id: Sort.FirstNameDesc, sortCriteriaName: 'First name - descending' },
    { id: Sort.LastNameAsc, sortCriteriaName: 'Last name - ascending' },
    { id: Sort.LastNameDesc, sortCriteriaName: 'Last name - descending' },
    { id: Sort.CharacterNameAsc, sortCriteriaName: 'Character name - ascending' },
    { id: Sort.CharacterNameDesc, sortCriteriaName: 'Character name - descending' },
  ]);
  public defaultSort: WritableSignal<SortCriteria> = signal({
    id: Sort.CastOrderAsc,
    sortCriteriaName: 'Cast order (ascending)',
  });
  private currentSortStr: WritableSignal<string | null> = signal(null);
  public currentSort: WritableSignal<SortCriteria | null> = signal(this.defaultSort());
  public enabledSortParams: WritableSignal<string> = signal('Enabled queryParams for sort: castOrderAsc, castOrderDesc, nameAsc, nameDesc, lastNameAsc, lastNameDesc, characterNameAsc, characterNameDesc');

  @ViewChild('movieCastShowXResults') movieCastShowXResults!: ShowXResults;
  public numberResultsOptions: WritableSignal<number[]> = signal([25, 50, 100]);
  public enabledNumberResultsParams: WritableSignal<string> = signal('Enabled queryParam resultsPerPage: 25, 50, 100 (other values are not valid)');
  public actorsPerPage: WritableSignal<number> = signal(25);

  public actorText: WritableSignal<string> = signal('Actor');
  public asText: WritableSignal<string> = signal('as');
  public characterText: WritableSignal<string> = signal('Character');

  public uncreditedCharacterText: WritableSignal<string> = signal('An uncredited character');
  public characterNotDefinedText: WritableSignal<string> = signal('A character not defined');
  public noRecognizableCastText: WritableSignal<string> = signal('This movie has no recognizable cast');

  private activatedRouteParentSubscription: Subscription = new Subscription();
  private getMovieCastSubscription: Subscription = new Subscription();
  private endLoadingSubscription: Subscription = new Subscription();
  private queryParamsSubscription: Subscription = new Subscription();
  private sortSelectSubscription: Subscription = new Subscription();

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
    this.sortSelectSubscription = this.sortSelectMovieCast.changes.subscribe((list) => {
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
        this.getCast();
      },
    );
  }

   private setTitle() {
    const formattedTitle: string = this.movieService.getFormattedMovieTitle(
      this.movie().title,
      this.movie().original_title,
      this.movie().release_date,
    );
    this.titleService.setMovieCastTitle(formattedTitle);
  }

  private setResultsPerPage(results: number) {
    if (this.numberResultsOptions().includes(results)) {
      this.actorsPerPage.set(results);
      this.movieCastShowXResults.setXResults(results);
    }
  }

  private setInitialOrder() {
    let sortCriteria: SortCriteria = null;

    if (this.currentSortStr() == 'castOrderAsc') {
      sortCriteria = { id: Sort.CastOrderAsc, sortCriteriaName: 'Cast order - ascending' };
    } else if (this.currentSortStr() == 'castOrderDesc') {
      sortCriteria = { id: Sort.CastOrderDesc, sortCriteriaName: 'Cast order -descending' };
    } else if (this.currentSortStr() == 'nameAsc') {
      sortCriteria = { id: Sort.FirstNameAsc, sortCriteriaName: 'First name - ascending' };
    } else if (this.currentSortStr() == 'nameDesc') {
      sortCriteria = { id: Sort.FirstNameDesc, sortCriteriaName: 'First name - descending' };
    } else if (this.currentSortStr() == 'lastNameAsc') {
      sortCriteria = { id: Sort.LastNameAsc, sortCriteriaName: 'Last name - ascending' };
    } else if (this.currentSortStr() == 'lastNameDesc') {
      sortCriteria = { id: Sort.LastNameDesc, sortCriteriaName: 'Last name - descending' };
    } else if (this.currentSortStr() == 'characterNameAsc') {
      sortCriteria = {
        id: Sort.CharacterNameAsc,
        sortCriteriaName: 'Character name - ascending',
      };
    } else if (this.currentSortStr() == 'characterNameDesc') {
      sortCriteria = {
        id: Sort.CharacterNameDesc,
        sortCriteriaName: 'Character name - descending',
      };
    }

    if (this.currentSortStr() != null) {
      this.currentSort.set(sortCriteria);
    }

    if (this.sortSelectMovieCast.length > 0) {
      this.sortSelectMovieCast.first.setSortCriteria(sortCriteria);
    }
  }

  private getCast(): void {
    this.movieCastError.set(false);
    this.getMovieCastSubscription = this.movieService.getMovieCast(this.id()).subscribe({
      next: (cast) => {
        this.movieCast.set(cast);
        this.totalActors.set(this.movieCast().length);
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {},
    });
  }

  private handleError(error: HttpErrorResponse): void {
    this.movieCastError.set(true);
    this.errorMessage.set(error.message);
  }

  public reloadCast(event: boolean): void {
    this.getCast();
  }

  public sortCriteriaChange(sortCriteria: SortCriteria): void {
    if (sortCriteria) {
      this.currentSort.set(sortCriteria);
    } else {
      this.currentSort.set(null);
    }
  }

  public changeItemsPerPage(itemsPerPage: number) {
    this.actorsPerPage.set(itemsPerPage);
    this.currentPage.set(1);
  }

  public changePage(page: number): void {
    this.currentPage.set(page);
    this.title.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  ngOnDestroy(): void {
    if (this.activatedRouteParentSubscription) {
      this.activatedRouteParentSubscription.unsubscribe();
    }
    if (this.getMovieCastSubscription) {
      this.getMovieCastSubscription.unsubscribe();
    }
    if (this.endLoadingSubscription) {
      this.endLoadingSubscription.unsubscribe();
    }
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
    if (this.sortSelectSubscription) {
      this.sortSelectSubscription.unsubscribe();
    }
  }
}
