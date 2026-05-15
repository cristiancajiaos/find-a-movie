import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResponsePersonMovieCredits } from '../../../classes/response-person-movie-credits';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../../services/person-service';
import { LocalStorageService } from '../../../services/local-storage-service';
import { HttpErrorResponse } from '@angular/common/http';
import { TitleService } from '../../../services/title-service';
import { Person } from '../../../classes/person';
import { ResponsePersonCrewCredit } from '../../../classes/person-movie-credits/response-person-crew-credit';

@Component({
  selector: 'app-person-crew-credits',
  standalone: false,
  templateUrl: './person-crew-credits.html',
  styleUrl: './person-crew-credits.scss'
})
export class PersonCrewCredits implements OnInit, OnDestroy {

  public id: number = 0;

  private person: Person;

  public personMovieCredits: ResponsePersonMovieCredits = new ResponsePersonMovieCredits();
  public personCrewCredits: ResponsePersonCrewCredit[] = [];

  public loadingPersonMovieCredits: boolean = false;

  public personMovieCreditsFound: boolean = false;
  public personMovieCreditsError: boolean = false;
  public errorMessage: string = '';

  public activatedRouteParentSubscription: Subscription | undefined;
  private getCrewCreditsSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private personService: PersonService,
    private localStorageService: LocalStorageService,
    private titleService: TitleService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getPerson();
    this.setId();
  }

  private getPerson(): void {
    this.person = this.localStorageService.getItem('person');
    this.setTitle();
  }

  private setId() {
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.getPersonMovieCredits();
    });
  }

  private setTitle() {
    this.titleService.setPersonCrewCreditsTitle(this.person.name);
  }

  private getPersonMovieCredits() {
    this.personMovieCreditsError = false;
    this.loadingPersonMovieCredits = true;
    this.personService.getCrewCredits(this.id).subscribe({
      next: (crewCredits) => {
        this.personCrewCredits = crewCredits;
        this.personMovieCreditsFound = true;
      },
      error: (error) => {
        this.handleError(error);
        this.loadingPersonMovieCredits = false;
      },
      complete: () => {
        this.loadingPersonMovieCredits = false;
      }
    });
  }

  private handleError(error: HttpErrorResponse) {
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
    if (this.getCrewCreditsSubscription) {
      this.getCrewCreditsSubscription.unsubscribe();
    }
  }

}
