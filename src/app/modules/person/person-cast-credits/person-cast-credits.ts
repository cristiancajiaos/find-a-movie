import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  WritableSignal,
  signal,
} from '@angular/core';
import { ResponsePersonMovieCredits } from '../../../classes/response-person-movie-credits';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../../../services/person-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Person } from '../../../classes/person';
import { TitleService } from '../../../services/title-service';
import { ResponsePersonCastCredit } from '../../../classes/person-movie-credits/response-person-cast-credit';
import { LoadingService } from '../../../services/loading-service';
import { SessionStorageService } from '../../../services/session-storage-service';
import { PersonCreditsQuery } from '../../../classes/person/person-credits-query';

@Component({
  selector: 'app-person-cast-credits',
  standalone: false,
  templateUrl: './person-cast-credits.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './person-cast-credits.scss',
})
export class PersonCastCredits implements OnInit, OnDestroy {

  private activatedRoute = inject(ActivatedRoute);
  private personService = inject(PersonService);
  private sessionStorageService = inject(SessionStorageService);
  private titleService = inject(TitleService);
  private loadingService = inject(LoadingService);

  public id: number = 0;

  private person: Person;

  public personMovieCredits: ResponsePersonMovieCredits = new ResponsePersonMovieCredits();

  public personCastCredits: WritableSignal<ResponsePersonCastCredit[]> = signal([]);

  public personMovieCreditsFound: boolean = false;
  public personMovieCreditsError: boolean = false;
  public errorMessage: string = '';

  public personCreditsQuery: WritableSignal<PersonCreditsQuery> = signal(new PersonCreditsQuery());

  private activatedRouteParentSubscription: Subscription = new Subscription();
  private getCreditsCastSubscription: Subscription = new Subscription();
  private endLoadingSubscription: Subscription = new Subscription();
  private queryParamsSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.getPerson();
    this.setId();
    this.endLoadingSubscription = this.loadingService.isEndLoading.subscribe((bool) => {
      if (this.personMovieCreditsFound) {
        this.setTitle();
      } else {
        if (this.personMovieCreditsError) {
          this.titleService.setPersonServiceErrorTitle();
        }
      }
    });
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams['order']) {
        this.personCreditsQuery.update((query) => {
          return {
            ...query,
            order: queryParams['order']
          }
        });
      }
      /*
      if (queryParams['roles']) {
        this.personCreditsQuery.update((query) => {
          return {
            ...query,
            roles: new String(queryParams['roles']).split(',')
          }
        });
      }
      */
      if (queryParams['fromYear']) {
        this.personCreditsQuery.update((query) => {
          return {
            ...query,
            fromYear: parseInt(queryParams['fromYear'])
          }
        });
      }
      if (queryParams['toYear']) {
        this.personCreditsQuery.update((query) => {
          return {
            ...query,
            toYear: parseInt(queryParams['toYear'])
          }
        });
      }
    });
  }

  private getPerson(): void {
    this.person = this.sessionStorageService.getItem('person');
    this.setTitle();
  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(
      (params) => {
        this.id = parseInt(params['id']);
        this.getPersonMovieCredits();
      },
    );
  }

  private setTitle(): void {
    this.titleService.setPersonCastCreditsTitle(this.person.name);
  }

  private getPersonMovieCredits(): void {
    this.personMovieCreditsError = false;
    this.personService.getCastCredits(this.id).subscribe({
      next: (castCredits) => {
        this.personCastCredits.set(castCredits);
        this.personMovieCreditsFound = true;
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {},
    });
  }

  private handleError(error: HttpErrorResponse): void {
    this.personMovieCreditsError = true;
    this.errorMessage = error.message;
  }

  public reloadMovieCredits(event: boolean): void {
    this.getPersonMovieCredits();
  }

  ngOnDestroy(): void {
    if (this.activatedRouteParentSubscription) {
      this.activatedRouteParentSubscription.unsubscribe();
    }
    if (this.getCreditsCastSubscription) {
      this.getCreditsCastSubscription.unsubscribe();
    }
    if (this.endLoadingSubscription) {
      this.endLoadingSubscription.unsubscribe();
    }
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
}
