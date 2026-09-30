import { Component, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy, inject, WritableSignal, signal } from '@angular/core';
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
export class MovieFullCrew implements OnInit, OnDestroy {

  private activatedRoute = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private sessionStorageService = inject(SessionStorageService);
  private titleService = inject(TitleService);
  private loadingService = inject(LoadingService);

  public id: number = 0;

  private movie: Movie;

  public movieFullCrew: WritableSignal<CrewMember[]> = signal([]);

  public fullCrewFound: boolean = false;
  public movieFullCrewError: boolean = false;
  public errorMessage: string = '';

  public orderCriterias: WritableSignal<OrderCriteria[]> = signal([
    { id: Order.NameAsc, orderCriteriaName: 'Name (ascending)' },
    { id: Order.NameDesc, orderCriteriaName: 'Name (descending)' },
    { id: Order.JobAsc, orderCriteriaName: 'Job (ascending)' },
    { id: Order.JobDesc, orderCriteriaName: 'Job (descending)' },
  ]);

  public defaultOrder: WritableSignal<OrderCriteria> = signal({
    id: Order.DefaultOrder,
    orderCriteriaName: 'Default Order',
  });

  public currentOrder: WritableSignal<OrderCriteria> = signal(this.defaultOrder());

  @ViewChild('orderSelectMovieFullCrew') orderSelectMovieFullCrew: OrderSelect;

  private activatedRouteParentSubscription: Subscription = new Subscription();
  private getMovieCrewSubscription: Subscription = new Subscription();
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
        this.getFullCrew();
      },
    );
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
  }
}
