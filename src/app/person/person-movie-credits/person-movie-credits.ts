import { Component, OnDestroy, OnInit } from '@angular/core';
import { Person } from '../../classes/person';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonService } from '../../services/person-service';
import { Credits } from '../../classes/credits';

@Component({
  selector: 'app-person-movie-credits',
  standalone: false,
  templateUrl: './person-movie-credits.html',
  styleUrl: './person-movie-credits.scss'
})
export class PersonMovieCredits implements OnInit, OnDestroy {

  public id: number = 0;
  public activeTab: number = 1;

  public personMovieCredits: Credits = new Credits();

  public loadingPersonMovieCredits: boolean = false;

  public activatedRouteParentSubscription: Subscription | undefined;

  public personMovieCreditsFound: boolean = false;
  public personMovieCreditsError: boolean = false;
  public errorMessage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.setId();

  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.getPersonMovieCredits();
    });
  }

  private getPersonMovieCredits(): void {
    this.personMovieCreditsError = false;
    this.loadingPersonMovieCredits = true;
    this.personService.getCredits(this.id)
    .then((credits) => {
      this.personMovieCredits = credits;
      this.personMovieCreditsFound = true;
    }).catch((error: HttpErrorResponse) => {
      this.handleError(error);
    }).finally(() => {
      this.loadingPersonMovieCredits = false;
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

  }

}
