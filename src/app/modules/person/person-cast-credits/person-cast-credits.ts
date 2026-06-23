import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ResponsePersonMovieCredits } from '../../../classes/response-person-movie-credits';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../../services/person-service';
import { LocalStorageService } from '../../../services/local-storage-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Person } from '../../../classes/person';
import { TitleService } from '../../../services/title-service';
import { ResponsePersonCastCredit } from '../../../classes/person-movie-credits/response-person-cast-credit';
import { LoadingService } from '../../../services/loading-service';

@Component({
  selector: 'app-person-cast-credits',
  standalone: false,
  templateUrl: './person-cast-credits.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './person-cast-credits.scss'
})
export class PersonCastCredits implements OnInit, OnDestroy {

  private activatedRoute = inject(ActivatedRoute);
  private personService = inject(PersonService);
  private localStorageService = inject(LocalStorageService);
  private titleService = inject(TitleService);
  private loadingService = inject(LoadingService);

  public id: number = 0;

  private person: Person;

  public personMovieCredits: ResponsePersonMovieCredits = new ResponsePersonMovieCredits();
  public personCastCredits: ResponsePersonCastCredit[] = [];

  public personMovieCreditsFound: boolean = false;
  public personMovieCreditsError: boolean = false;
  public errorMessage: string = '';

  private activatedRouteParentSubscription: Subscription = new Subscription();
  private getCreditsCastSubscription: Subscription = new Subscription();
  private endLoadingSubscription: Subscription = new Subscription();

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
  }

  private getPerson(): void {
    this.person = this.localStorageService.getItem('person');
    this.setTitle();
  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.getPersonMovieCredits();
    });
  }

  private setTitle(): void {
    this.titleService.setPersonCastCreditsTitle(this.person.name);
  }

  private getPersonMovieCredits(): void {
    this.personMovieCreditsError = false;
    this.personService.getCastCredits(this.id).subscribe({
      next: (castCredits) => {
        this.personCastCredits = castCredits;
        this.personMovieCreditsFound = true;
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {
      }
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
  }

}
