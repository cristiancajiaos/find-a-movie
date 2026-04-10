import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../../../services/movie-service';
import { CastMember } from '../../../classes/credits/cast-member';
import { HttpErrorResponse } from '@angular/common/http';
import { Order } from '../../../enums/order';
import { OrderCriteria } from '../../../interfaces/order-criteria';
import { OrderSelect } from '../../../components/shared/order-select/order-select';

@Component({
  selector: 'app-movie-cast',
  standalone: false,
  templateUrl: './movie-cast.html',
  styleUrl: './movie-cast.scss',
})
export class MovieCast implements OnInit, OnDestroy {
  public id: number = 0;

  public movieCast: CastMember[] = [];

  public loadingCast: boolean = false;

  public activatedRouteParentSubscription: Subscription | undefined;

  public castFound: boolean = false;
  public movieCastError: boolean = false;
  public errorMessage: string = '';

  public orderCriterias: OrderCriteria[] = [
    { id: Order.CastOrderAsc, orderCriteriaName: 'Cast order (ascending)' },
    { id: Order.CastOrderDesc, orderCriteriaName: 'Cast order (descending)' },
    { id: Order.NameAsc, orderCriteriaName: 'Name (ascending)' },
    { id: Order.NameDesc, orderCriteriaName: 'Name (descending)' },
    { id: Order.CharacterNameAsc, orderCriteriaName: 'Character name (ascending)' },
    { id: Order.CharacterNameDesc, orderCriteriaName: 'Character name (descending)' },
  ];

  @ViewChild('orderSelectMovieCast') orderSelectMovieCast: OrderSelect;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
  ) {}

  ngOnInit(): void {
    this.setId();
  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(
      (params) => {
        this.id = parseInt(params['id']);
        this.getCast();
      },
    );
  }

  private getCast(): void {
    this.movieCastError = false;
    this.loadingCast = true;
    this.movieService
      .getMovieCast(this.id)
      .then((cast) => {
        this.movieCast = cast;
        this.castFound = true;
      })
      .catch((error: HttpErrorResponse) => {
        this.handleError(error);
      })
      .finally(() => {
        this.loadingCast = false;
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
    if (orderCriteria.id == Order.CastOrderAsc) {
      this.movieCast.sort((a, b) => {
        return a.order - b.order;
      });
    } else if (orderCriteria.id == Order.CastOrderDesc) {
      this.movieCast.sort((a, b) => {
        return b.order - a.order;
      });
    } else if (orderCriteria.id == Order.NameAsc) {
      this.movieCast.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else if (orderCriteria.id == Order.NameDesc) {
      this.movieCast.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    } else if (orderCriteria.id == Order.CharacterNameAsc) {
      this.movieCast.sort((a, b) => {
        return a.character.localeCompare(b.character);
      });
    } else if (orderCriteria.id == Order.CharacterNameDesc) {
      this.movieCast.sort((a, b) => {
        return b.character.localeCompare(a.character);
      });
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteParentSubscription?.unsubscribe();
  }
}
