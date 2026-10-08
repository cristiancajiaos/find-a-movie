import { Component, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy, inject, WritableSignal, signal, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../../../services/movie-service';
import { CrewMember } from '../../../classes/credits/crew-member';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderCriteria } from '../../../interfaces/order-criteria';
import { Order } from '../../../enums/order';
import { OrderSelect } from '../../../components/shared/order-select/order-select';
import { Movie } from '../../../classes/movie';
import { TitleService } from '../../../services/title-service';
import { LoadingService } from '../../../services/loading-service';
import { SessionStorageService } from '../../../services/session-storage-service';

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

  public id: number = 0;

  private movie: Movie = null;

  public currentPage: number = 1;
  public crewMembersPerPage: number = 50;
  public totalCrewMembers: number = 0;

  public movieFullCrew: WritableSignal<CrewMember[]> = signal([]);

  public fullCrewFound: boolean = false;
  public movieFullCrewError: boolean = false;
  public errorMessage: string = '';

  public orderCriterias: WritableSignal<OrderCriteria[]> = signal([
    { id: Order.DefaultOrder, orderCriteriaName: 'Default order' },
    { id: Order.NameAsc, orderCriteriaName: 'Name (ascending)' },
    { id: Order.NameDesc, orderCriteriaName: 'Name (descending)' },
    { id: Order.JobAsc, orderCriteriaName: 'Job (ascending)' },
    { id: Order.JobDesc, orderCriteriaName: 'Job (descending)' },
  ]);

  public defaultOrder: WritableSignal<OrderCriteria> = signal({
    id: Order.DefaultOrder,
    orderCriteriaName: 'Default Order',
  });

  private currentOrderStr: WritableSignal<string | null> = signal(null);
  public currentOrder: WritableSignal<OrderCriteria> = signal(this.defaultOrder());

  @ViewChildren('orderSelectMovieFullCrew') orderSelectMovieFullCrew!: QueryList<OrderSelect>;

  @ViewChild('title') title!: ElementRef;

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
      if (queryParams['order']) {
        this.currentOrderStr.set(queryParams['order']);
      }
    });
  }

  ngAfterViewInit(): void {
    this.orderSelectSubscription = this.orderSelectMovieFullCrew.changes.subscribe((list) => {
      this.setInitialOrder();
    });
  }

  private getMovie(): void {
    this.movie = this.sessionStorageService.getItem('movie');
  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(
      (params) => {
        this.id = parseInt(params['id']);
        this.getFullCrew();
      },
    );
  }

  private setInitialOrder(): void {
    let orderCriteria: OrderCriteria = null;

    if (this.currentOrderStr() == 'defaultValue') {
      orderCriteria = { id: Order.DefaultOrder, orderCriteriaName: 'Default order' };
    } else if (this.currentOrderStr() == 'nameAsc') {
      orderCriteria = { id: Order.NameAsc, orderCriteriaName: 'Name (ascending)' };
    } else if (this.currentOrderStr() == 'nameDesc') {
      orderCriteria = { id: Order.NameDesc, orderCriteriaName: 'Name (descending)' };
    } else if (this.currentOrderStr() == 'jobAsc') {
      orderCriteria = { id: Order.JobAsc, orderCriteriaName: 'Job (ascending)' };
    } else if (this.currentOrderStr() == 'jobDesc') {
      orderCriteria = { id: Order.JobDesc, orderCriteriaName: 'Job (descending)' };
    }

    if (this.currentOrderStr() != null) {
      this.currentOrder.set(orderCriteria);
    }

    if (this.orderSelectMovieFullCrew.length > 0) {
      this.orderSelectMovieFullCrew.first.setOrderCriteria(orderCriteria);
    }
  }

  private setTitle(): void {
    const formattedTitle: string = this.movieService.getFormattedMovieTitle(
      this.movie.title, this.movie.original_title, this.movie.release_date
    );
    this.titleService.setMovieFullCrewTitle(formattedTitle);
  }

  private getFullCrew(): void {
    this.movieFullCrewError = false;
    this.getMovieCrewSubscription = this.movieService.getMovieCrew(this.id).subscribe({
      next: (crew) => {
        this.movieFullCrew.set(crew);
        this.totalCrewMembers = this.movieFullCrew().length;
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {
      }
    });
  }

  private handleError(error: HttpErrorResponse): void {
    this.movieFullCrewError = true;
    this.errorMessage = error.message;
  }

  public reloadFullCrew(event: boolean): void {
    this.getFullCrew();
  }

  public orderCriteriaChange(orderCriteria: OrderCriteria): void {
    this.currentOrder.set(orderCriteria);
  }

  public changePage(page: number): void {
    this.currentPage = page;
    this.title.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
