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
import { Order } from '../../../enums/order';
import { OrderCriteria } from '../../../interfaces/order-criteria';
import { OrderSelect } from '../../../components/shared/order-select/order-select';
import { Movie } from '../../../classes/movie';
import { TitleService } from '../../../services/title-service';
import { LoadingService } from '../../../services/loading-service';
import { SessionStorageService } from '../../../services/session-storage-service';
import { ShowXResults } from '../../../components/shared/show-x-results/show-x-results';
import { sign } from 'crypto';

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

  public castFound: boolean = false;
  public movieCastError: boolean = false;
  public errorMessage: string = '';

  @ViewChild('title') title!: ElementRef;
  public castTitle: WritableSignal<string> = signal('Cast');

  @ViewChildren('orderSelectMovieCast') orderSelectMovieCast!: QueryList<OrderSelect>;
  public orderCriterias: WritableSignal<OrderCriteria[]> = signal([
    { id: Order.CastOrderAsc, orderCriteriaName: 'Cast order - ascending' },
    { id: Order.CastOrderDesc, orderCriteriaName: 'Cast order - descending' },
    { id: Order.FirstNameAsc, orderCriteriaName: 'First name - ascending' },
    { id: Order.FirstNameDesc, orderCriteriaName: 'First name - descending' },
    { id: Order.LastNameAsc, orderCriteriaName: 'Last name - ascending' },
    { id: Order.LastNameDesc, orderCriteriaName: 'Last name - descending' },
    { id: Order.CharacterNameAsc, orderCriteriaName: 'Character name - ascending' },
    { id: Order.CharacterNameDesc, orderCriteriaName: 'Character name - descending' },
  ]);
  public defaultOrder: WritableSignal<OrderCriteria> = signal({
    id: Order.CastOrderAsc,
    orderCriteriaName: 'Cast order (ascending)',
  });
  private currentOrderStr: WritableSignal<string | null> = signal(null);
  public currentOrder: WritableSignal<OrderCriteria | null> = signal(this.defaultOrder());
  public enabledOrderParams: WritableSignal<string> = signal('Enabled queryParams for order: castOrderAsc, castOrderDesc, nameAsc, nameDesc, lastNameAsc, lastNameDesc, characterNameAsc, characterNameDesc');

  @ViewChild('movieCastShowXResults') movieCastShowXResults!: ShowXResults;
  public numberResultsOptions: WritableSignal<number[]> = signal([25, 50, 100]);
  public enabledNumberResultsParams: WritableSignal<string> = signal('Enabled queryParam resultsPerPage: 25, 50, 100 (other values are not valid)');
  public actorsPerPage: WritableSignal<number> = signal(25);

  public actorText: WritableSignal<string> = signal('Actor');
  public asText: WritableSignal<string> = signal('as');
  public characterText: WritableSignal<string> = signal('Character');

  public uncreditedCharacterText: WritableSignal<string> = signal('An uncredited character');
  public characterNotDefinedText: WritableSignal<string> = signal('A character not defined');
  public noRecoginzableCastText: WritableSignal<string> = signal('This movie has no recognizable cast');

  private activatedRouteParentSubscription: Subscription = new Subscription();
  private getMovieCastSubscription: Subscription = new Subscription();
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
      if (queryParams['order']) {
        this.currentOrderStr.set(queryParams['order']);
      }
      if (queryParams['resultsPerPage']) {
        this.setResultsPerPage(parseInt(queryParams['resultsPerPage']));
      }
    });
  }

  ngAfterViewInit(): void {
    this.orderSelectSubscription = this.orderSelectMovieCast.changes.subscribe((list) => {
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
    let orderCriteria: OrderCriteria = null;

    if (this.currentOrderStr() == 'castOrderAsc') {
      orderCriteria = { id: Order.CastOrderAsc, orderCriteriaName: 'Cast order - ascending' };
    } else if (this.currentOrderStr() == 'castOrderDesc') {
      orderCriteria = { id: Order.CastOrderDesc, orderCriteriaName: 'Cast order -descending' };
    } else if (this.currentOrderStr() == 'nameAsc') {
      orderCriteria = { id: Order.FirstNameAsc, orderCriteriaName: 'First name - ascending' };
    } else if (this.currentOrderStr() == 'nameDesc') {
      orderCriteria = { id: Order.FirstNameDesc, orderCriteriaName: 'First name - descending' };
    } else if (this.currentOrderStr() == 'lastNameAsc') {
      orderCriteria = { id: Order.LastNameAsc, orderCriteriaName: 'Last name - ascending' };
    } else if (this.currentOrderStr() == 'lastNameDesc') {
      orderCriteria = { id: Order.LastNameDesc, orderCriteriaName: 'Last name - descending' };
    } else if (this.currentOrderStr() == 'characterNameAsc') {
      orderCriteria = {
        id: Order.CharacterNameAsc,
        orderCriteriaName: 'Character name - ascending',
      };
    } else if (this.currentOrderStr() == 'characterNameDesc') {
      orderCriteria = {
        id: Order.CharacterNameDesc,
        orderCriteriaName: 'Character name - descending',
      };
    }

    if (this.currentOrderStr() != null) {
      this.currentOrder.set(orderCriteria);
    }

    if (this.orderSelectMovieCast.length > 0) {
      this.orderSelectMovieCast.first.setOrderCriteria(orderCriteria);
    }
  }

  private getCast(): void {
    this.movieCastError = false;
    this.getMovieCastSubscription = this.movieService.getMovieCast(this.id()).subscribe({
      next: (cast) => {
        this.movieCast.set(cast);
        this.totalActors.set(this.movieCast().length);
        this.castFound = true;
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {},
    });
  }

  private handleError(error: HttpErrorResponse): void {
    this.movieCastError = true;
    this.errorMessage = error.message;
  }

  public reloadCast(event: boolean): void {
    this.getCast();
  }

  public orderCriteriaChange(orderCriteria: OrderCriteria): void {
    if (orderCriteria) {
      this.currentOrder.set(orderCriteria);
    } else {
      this.currentOrder.set(null);
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
    if (this.orderSelectSubscription) {
      this.orderSelectSubscription.unsubscribe();
    }
  }
}
