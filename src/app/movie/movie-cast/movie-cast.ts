import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../../services/movie-service';
import { CastMember } from '../../classes/cast-member';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-movie-cast',
  standalone: false,
  templateUrl: './movie-cast.html',
  styleUrl: './movie-cast.scss'
})
export class MovieCast implements OnInit, OnDestroy {

  public id: number = 0;

  public movieCast: CastMember[] = [];

  public loadingCast: boolean = false;

  public orderCastForm: FormGroup = new FormGroup({});

  public activatedRouteParentSubscription: Subscription | undefined;

  public castFound: boolean = false;
  public movieCastError: boolean = false;
  public errorMessage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setId();

    this.orderCastForm = this.fb.group({
      orderCast: new FormControl('1')
    });
  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.getCast();
    });
  }

  private getCast(): void {
    this.movieCastError = false;
    this.loadingCast = true;
    this.movieService.getMovieCast(this.id).then(cast => {
      this.movieCast = cast;
      this.castFound = true;
    }).catch((error: HttpErrorResponse) => {
      console.log(error);
      this.handleError(error);
    }).finally(() => {
      this.loadingCast = false;
    })
  }

  private handleError(error: HttpErrorResponse): void {
    this.movieCastError = true;
    this.errorMessage = error.message;
  }

  public reloadCast(event: boolean): void {
    this.getCast();
  }



  public changeCastOrder(): void {
    switch (this.orderCastForm.value['orderCast']) {
      case '1': {
        this.movieCast.sort((a, b) => {
          return a.order - b.order;
        });
        break;
      }

      case '2': {
        this.movieCast.sort((a, b) => {
          return b.order - a.order;
        });
        break;
      }

      case '3': {
        this.movieCast.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        break;
      }

      case '4': {
        this.movieCast.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
        break;
      }

      case '5': {
        this.movieCast.sort((a, b) => {
          return a.character.localeCompare(b.character);
        });
        break;
      }

      case '6': {
        this.movieCast.sort((a, b) => {
          return b.character.localeCompare(a.character);
        });
        break;
      }

      default: {
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteParentSubscription?.unsubscribe();
  }

}
