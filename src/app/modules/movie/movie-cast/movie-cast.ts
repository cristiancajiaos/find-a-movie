import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  inject,
  WritableSignal,
  signal,
  ElementRef
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
export class MovieCast implements OnInit, OnDestroy {
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
    id: Order.DefaultOrder,
    orderCriteriaName: 'Default Order',
  });

  public currentOrder: WritableSignal<OrderCriteria> = signal(this.defaultOrder());

  @ViewChild('orderSelectMovieCast') orderSelectMovieCast: OrderSelect;

  @ViewChild('title') title!: ElementRef;

  private activatedRouteParentSubscription: Subscription = new Subscription();
  private getMovieCastSubscription: Subscription = new Subscription();
  private endLoadingSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.getMovie();
    this.setId();
    this.endLoadingSubscription = this.loadingService.isEndLoading.subscribe((bool) => {
      if (this.movie) {
        this.setTitle();
      }
    });
  }

  private getMovie(): void {
    this.movie = this.sessionStorageService.getItem('movie');
  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(
      (params) => {
        this.id = parseInt(params['id']);
        this.getCast();
      },
    );
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
    if (this.getMovieCastSubscription) {
      this.getMovieCastSubscription.unsubscribe();
    }
    if (this.endLoadingSubscription) {
      this.endLoadingSubscription.unsubscribe();
    }
  }
}
