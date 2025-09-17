import { Component, OnDestroy, OnInit } from '@angular/core';
import { Person } from '../../classes/person';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonService } from '../../services/person-service';
import { LocalStorageService } from '../../services/local-storage-service';

@Component({
  selector: 'app-person-overview',
  standalone: false,
  templateUrl: './person-overview.html',
  styleUrl: './person-overview.scss',
})
export class PersonOverview implements OnInit, OnDestroy {
  public id: number = 0;

  public person: Person = new Person();

  public activatedRouteParentSubscription: Subscription | undefined;

  public loadingPerson: boolean = false;

  public personBiography: string = '';

  public personFound: boolean = false;
  public personOverviewError: boolean = false;
  public errorMessage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private personService: PersonService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.setId();
  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(
      (params) => {
        this.id = parseInt(params['id']);
        this.getPerson();
      }
    );
  }

  private getPerson(): void {
    this.personOverviewError = false;
    this.loadingPerson = true;

    const localPerson: Person = this.localStorageService.getItem('person');
    
    if (localPerson) {
      this.person = localPerson;
      this.loadingPerson = false;
      this.setPersonBiography();
    } else {
      this.personService
        .getPerson(this.id)
        .then((person) => {
          this.person = person;
          this.personFound = true;
          this.setPersonBiography();
        })
        .catch((error: HttpErrorResponse) => {
          this.handleError(error);
        })
        .finally(() => {
          this.loadingPerson = false;
        });
    }
  }

  private handleError(error: HttpErrorResponse) {
    this.personOverviewError = true;
    this.errorMessage = error.message;
  }

  public reloadOverview(event: boolean): void {
    this.getPerson();
  }

  private setPersonBiography(): void {
    if (this.person.biography.length !== 0) {
      this.personBiography = this.person.biography;
    }
  }

  ngOnDestroy(): void {
    if (this.activatedRouteParentSubscription) {
      this.activatedRouteParentSubscription.unsubscribe();
    }
  }
}
