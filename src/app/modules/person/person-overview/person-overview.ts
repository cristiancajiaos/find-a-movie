import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { Person } from '../../../classes/person';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonService } from '../../../services/person-service';
import { LocalStorageService } from '../../../services/local-storage-service';
import { environment } from '../../../../environments/environment.development';
import { faCircleQuestion, faGlobe, faMars, faVenus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faImdb } from '@fortawesome/free-brands-svg-icons';
import { TitleService } from '../../../services/title-service';
import { LoadingService } from '../../../services/loading-service';

@Component({
  selector: 'app-person-overview',
  standalone: false,
  templateUrl: './person-overview.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './person-overview.scss',
})
export class PersonOverview implements OnInit, OnDestroy {

  private activatedRoute = inject(ActivatedRoute);
  private personService = inject(PersonService);
  private localStorageService = inject(LocalStorageService);
  private titleService = inject(TitleService);
  private loadingService = inject(LoadingService); 

  public maleIcon: IconDefinition = faMars;
  public femaleIcon: IconDefinition = faVenus;
  public imdbIcon: IconDefinition = faImdb;
  public globeIcon: IconDefinition = faGlobe;
  public questionIcon: IconDefinition = faCircleQuestion;

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
      switch (this.person.gender) {
        case 1: {
          this.personGender = 'Female';
          this.personGenderIcon = this.femaleIcon;
          break;
        }
        case 2: {
          this.personGender = 'Male';
          this.personGenderIcon = this.maleIcon;
          break;
        }
        default: {
          this.personGender = '?';
          this.personGenderIcon = this.questionIcon;
          break;
        }
      }
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
