import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../../../services/movie-service';
import { CrewMember } from '../../../classes/credits/crew-member';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderCriteria } from '../../../interfaces/order-criteria';
import { Order } from '../../../enums/order';
import { OrderSelect } from '../../../components/shared/order-select/order-select';
import { Movie } from '../../../classes/movie';
import { LocalStorageService } from '../../../services/local-storage-service';
import { TitleService } from '../../../services/title-service';

@Component({
  selector: 'app-movie-full-crew',
  standalone: false,
  templateUrl: './movie-full-crew.html',
  styleUrl: './movie-full-crew.scss',
})
export class MovieFullCrew implements OnInit, OnDestroy {
  public id: number = 0;

  private movie: Movie;

  public originalMovieFullCrew: CrewMember[] = [];
  public movieFullCrew: CrewMember[] = [];

  public loadingFullCrew: boolean = false;

  public activatedRouteParentSubscription: Subscription | undefined;

  public fullCrewFound: boolean = false;
  public movieFullCrewError: boolean = false;
  public errorMessage: string = '';

  public orderCriterias: OrderCriteria[] = [
    { id: Order.NameAsc, orderCriteriaName: 'Name (ascending)' },
    { id: Order.NameDesc, orderCriteriaName: 'Name (descending)' },
    { id: Order.JobAsc, orderCriteriaName: 'Job (ascending)' },
    { id: Order.JobDesc, orderCriteriaName: 'Job (descending)' },
  ];

  public defaultOrder: OrderCriteria = {
    id: Order.DefaultOrder,
    orderCriteriaName: 'Default Order',
  };

  @ViewChild('orderSelectMovieFullCrew') orderSelectMovieFullCrew: OrderSelect;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private localStorageService: LocalStorageService,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.getMovie();
    this.setId();
  }

  private getMovie(): void {
    this.movie = this.localStorageService.getItem('movie');
    this.setTitle();
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
    this.loadingFullCrew = true;
    this.movieService
      .getMovieCrew(this.id)
      .then((crew) => {
        this.originalMovieFullCrew = crew;
        this.movieFullCrew = crew;
      })
      .catch((error: HttpErrorResponse) => {
        this.handleError(error);
      })
      .finally(() => {
        this.loadingFullCrew = false;
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
    if (orderCriteria.id == Order.NameAsc) {
      this.movieFullCrew.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else if (orderCriteria.id == Order.NameDesc) {
      this.movieFullCrew.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    } else if (orderCriteria.id == Order.JobAsc) {
      this.movieFullCrew.sort((a, b) => {
        return a.job.localeCompare(b.job);
      });
    } else if (orderCriteria.id == Order.JobDesc) {
      this.movieFullCrew.sort((a, b) => {
        return b.job.localeCompare(a.job);
      });
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteParentSubscription!.unsubscribe();
  }
}
