import { Component, OnDestroy, OnInit } from '@angular/core';
import { Person } from '../../../classes/person';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonService } from '../../../services/person-service';
import { LocalStorageService } from '../../../services/local-storage-service';
import { environment } from '../../../../environments/environment.development';
import { faGlobe, faMars, faVenus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faImdb } from '@fortawesome/free-brands-svg-icons';
import { TitleService } from '../../../services/title-service';
import { LoadingService } from '../../../services/loading-service';

@Component({
  selector: 'app-person-overview',
  standalone: false,
  templateUrl: './person-overview.html',
  styleUrl: './person-overview.scss',
})
export class PersonOverview implements OnInit, OnDestroy {
  public maleIcon: IconDefinition = faMars;
  public femaleIcon: IconDefinition = faVenus;
  public imdbIcon: IconDefinition = faImdb;
  public globeIcon: IconDefinition = faGlobe;

  public id: number = 0;

  public person: Person = new Person();

  public personBiography: string = '';

  public personAlsoKnownAs: string[] = [];
  public personBirthDay?: Date;
  public personDeathDay?: Date;
  public personPlaceBirth: string = '';
  public personGender: string = '';
  public personGenderIcon?: IconDefinition;
  public personMainOccupation: string = '';
  public personIMDBUrl: string = '';
  public personHomepageUrl: string = '';

  private personError: HttpErrorResponse = null;
  public personFound: boolean = false;
  public personErrorFound: boolean = false;
  public errorMessage: string = '';

  private activatedRouteParentSubscription: Subscription = new Subscription();
  private getPersonSubscription: Subscription = new Subscription();
  private endLoadingSubscription: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private personService: PersonService,
    private localStorageService: LocalStorageService,
    private titleService: TitleService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.setId();
    this.endLoadingSubscription = this.loadingService.isEndLoading.subscribe((bool) => {
      if (this.person) {
        this.setTitle();
      } else {
        if (this.personError) {
          this.titleService.setPersonServiceErrorTitle();
        }
      }
    });
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
    this.personErrorFound = false;

    const localPerson: Person = this.localStorageService.getItem('person');

    if (localPerson) {
      this.person = localPerson;

      this.setPersonBiography();
      this.setPersonInfotable();
    } else {
      this.getPersonSubscription = this.personService.getPerson(this.id).subscribe({
        next: (person) => {
          this.person = person;
          this.personFound = true;
          this.setPersonBiography();
          this.setPersonInfotable();
        },
        error: (error) => {
          this.handleError(error);
        },
        complete: () => {
        }
      })
    }
  }

  private setTitle(): void {
    this.titleService.setPersonOverviewTitle(this.person.name);
  }

  private handleError(error: HttpErrorResponse) {
    this.personErrorFound = true;
    this.errorMessage = error.message;
    this.personError = error;
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
      this.personGenderIcon = (this.person.gender == 1) ? this.femaleIcon : this.maleIcon;
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
    if (this.getPersonSubscription) {
      this.getPersonSubscription.unsubscribe();
    }
    if (this.endLoadingSubscription) {
      this.endLoadingSubscription.unsubscribe();
    }

  }
}
