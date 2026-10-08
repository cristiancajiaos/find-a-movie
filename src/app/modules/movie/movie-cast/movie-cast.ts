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

  public id: number = 0;

  public currentPage: number = 1;
  public actorsPerPage: number = 50;
  public totalActors: number = 0;

  private movie: Movie = null;

  public movieCast: WritableSignal<CastMember[]> = signal([]);

  public castFound: boolean = false;
  public movieCastError: boolean = false;
  public errorMessage: string = '';

  public orderCriterias: WritableSignal<OrderCriteria[]> = signal([
    { id: Order.CastOrderAsc, orderCriteriaName: 'Cast order (ascending)' },
    { id: Order.CastOrderDesc, orderCriteriaName: 'Cast order (descending)' },
    { id: Order.NameAsc, orderCriteriaName: 'Name (ascending)' },
    { id: Order.NameDesc, orderCriteriaName: 'Name (descending)' },
    { id: Order.CharacterNameAsc, orderCriteriaName: 'Character name (ascending)' },
    { id: Order.CharacterNameDesc, orderCriteriaName: 'Character name (descending)' },
  ]);

  public defaultOrder: WritableSignal<OrderCriteria> = signal({
    id: Order.CastOrderAsc,
    orderCriteriaName: 'Cast order (ascending)',
  });

  private currentOrderStr: WritableSignal<string | null> = signal(null);
  public currentOrder: WritableSignal<OrderCriteria | null> = signal(this.defaultOrder());

  @ViewChildren('orderSelectMovieCast') orderSelectMovieCast!: QueryList<OrderSelect>;

  @ViewChild('title') title!: ElementRef;

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
    });
  }

  ngAfterViewInit(): void {
    this.orderSelectSubscription = this.orderSelectMovieCast.changes.subscribe((list) => {
      this.setInitialOrder();
    });
  }

  private getMovie(): void {
    this.movie = this.sessionStorageService.getItem('movie');
    this.setTitle();
  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(
      (params) => {
        this.id = parseInt(params['id']);
        this.getCast();
      },
    );
  }

  private setInitialOrder() {
    let orderCriteria: OrderCriteria = null;

    if (this.currentOrderStr() == 'castOrderAsc') {
      orderCriteria = { id: Order.CastOrderAsc, orderCriteriaName: 'Cast order (ascending)' };
    } else if (this.currentOrderStr() == 'castOrderDesc') {
      orderCriteria = { id: Order.CastOrderDesc, orderCriteriaName: 'Cast order (descending)' };
    } else if (this.currentOrderStr() == 'nameAsc') {
      orderCriteria = { id: Order.NameAsc, orderCriteriaName: 'Name (ascending)' };
    } else if (this.currentOrderStr() == 'nameDesc') {
      orderCriteria = { id: Order.NameDesc, orderCriteriaName: 'Name (descending)' };
    } else if (this.currentOrderStr() == 'characterNameAsc') {
      orderCriteria = {
        id: Order.CharacterNameAsc,
        orderCriteriaName: 'Character name (ascending)',
      };
    } else if (this.currentOrderStr() == 'characterNameDesc') {
      orderCriteria = {
        id: Order.CharacterNameDesc,
        orderCriteriaName: 'Character name (descending)',
      };
    }

    if (this.currentOrderStr() != null) {
      this.currentOrder.set(orderCriteria);
    }

    if (this.orderSelectMovieCast.length > 0) {
      this.orderSelectMovieCast.first.setOrderCriteria(orderCriteria);
    }
  }

  private setTitle() {
    const formattedTitle: string = this.movieService.getFormattedMovieTitle(
      this.movie.title,
      this.movie.original_title,
      this.movie.release_date,
    );
    this.titleService.setMovieCastTitle(formattedTitle);
  }

  private getCast(): void {
    this.movieCastError = false;
    this.getMovieCastSubscription = this.movieService.getMovieCast(this.id).subscribe({
      next: (cast) => {
        this.movieCast.set(cast);
        this.totalActors = this.movieCast().length;
        this.castFound = true;
        // this.setOrder();
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

  public changePage(page: number): void {
    this.currentPage = page;
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
