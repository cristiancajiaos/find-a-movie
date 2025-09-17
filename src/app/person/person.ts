import { AfterContentInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TitleService } from '../services/title-service';
import { Person } from '../classes/person';
import { PersonService } from '../services/person-service';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonHeader } from './person-header/person-header';
import { LocalStorageService } from '../services/local-storage-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-person',
  standalone: false,
  templateUrl: './person.html',
  styleUrl: './person.scss'
})
export class PersonComponent implements OnInit, AfterContentInit, OnDestroy {

  public id: number = 0;

  public person: Person = new Person();

  public loadingView: boolean = true;
  public loadingPerson: boolean = false;

  public personNotFound: boolean = false;
  public personError: boolean = false;
  public errorMessage: string = '';

  public personBiography: string = '';

  public routeSubscription!: Subscription;

  @ViewChild('personHeader') personHeader!: PersonHeader;

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: TitleService,
    private personService: PersonService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cd.detectChanges();
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.getPerson();
    });
  }

  ngAfterContentInit(): void {
    this.loadingView = false;
    this.cd.detectChanges();
  }

  private getPerson(): void {
    this.personError = false;
    this.loadingPerson = true;
    this.personService.getPerson(this.id)
    .then(person => {
      this.person = person;
      this.localStorageService.setItem("person", person);
      this.setPersonTitle();
      this.setPersonBiography();
    }).catch((error: HttpErrorResponse) => {
      this.handleError(error);
    }).finally(() => {
      this.loadingPerson = false;
    });
  }

  private setPersonBiography(): void {
    this.personBiography = this.person.biography;
  }

  private handleError(error: HttpErrorResponse): void {
    this.personError = true;
    if (error.status && error.status === 404) {
      this.personNotFound = true;
      this.titleService.setTitle("Person Not Found");
    } else {
      this.errorMessage = this.errorMessage;
      this.titleService.setTitle("PersonService Error");
    }
  }

  public reloadPerson(event: boolean): void {
    this.getPerson();
  }

  private setPersonTitle(): void {
    this.titleService.setTitle(this.person.name);
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

}
