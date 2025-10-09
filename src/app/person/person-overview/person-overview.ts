import { Component, OnDestroy, OnInit } from '@angular/core';
import { Person } from '../../classes/person';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonService } from '../../services/person-service';
import { LocalStorageService } from '../../services/local-storage-service';
import { environment } from '../../../environments/environment.development';
import { faGlobe, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faImdb } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-person-overview',
  standalone: false,
  templateUrl: './person-overview.html',
  styleUrl: './person-overview.scss',
})
export class PersonOverview implements OnInit, OnDestroy {
  public imdbIcon: IconDefinition = faImdb;
  public globeIcon: IconDefinition = faGlobe;

  public id: number = 0;

  public person: Person = new Person();

  public activatedRouteParentSubscription: Subscription | undefined;

  public loadingPerson: boolean = false;

  public personBiography: string = '';

  public personAlsoKnownAs: string[] = [];
  public personBirthDay?: Date;
  public personDeathDay?: Date;
  public personPlaceBirth: string = '';
  public personGender: string = '';
  public personMainOccupation: string = '';
  public personIMDBUrl: string = '';
  public personHomepageUrl: string = '';

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
      this.setPersonInfotable();
    } else {
      this.personService
        .getPerson(this.id)
        .then((person) => {
          this.person = person;
          this.personFound = true;
          this.setPersonBiography();
          this.setPersonInfotable();
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

  private setPersonInfotable(): void {
    if (this.person.also_known_as.length > 0) {
      this.personAlsoKnownAs = this.person.also_known_as;
    }
    if (this.person.birthday) {
      this.personBirthDay = new Date(this.person.birthday);
    }
    if (this.person.place_of_birth) {
      this.personPlaceBirth = this.person.place_of_birth;
    }
    if (this.person.deathday) {
      this.personDeathDay = new Date(this.person.deathday);
    }
    if (this.person.gender) {
      this.personGender = (this.person.gender == 1) ? 'Female' : 'Male';
    }
    if (this.person.known_for_department) {
      this.personMainOccupation = this.person.known_for_department;
    }
    if (this.person.imdb_id) {
      this.personIMDBUrl = `${environment.imdbPersonUrl}${this.person.imdb_id}`;
    }
    if (this.person.homepage) {
      this.personHomepageUrl = `${this.person.homepage}`;
    }

  }

  ngOnDestroy(): void {
    if (this.activatedRouteParentSubscription) {
      this.activatedRouteParentSubscription.unsubscribe();
    }
  }
}
