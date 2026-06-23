import { AfterContentInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from '../../services/title-service';
import { Person } from '../../classes/person';
import { PersonService } from '../../services/person-service';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonHeader } from './person-header/person-header';
import { LocalStorageService } from '../../services/local-storage-service';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading-service';

@Component({
  selector: 'app-person',
  standalone: false,
  templateUrl: './person.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './person.scss'
})
export class PersonComponent implements OnInit, AfterContentInit, OnDestroy {

  public id: number = 0;

  public person: Person = null;

  private personError: HttpErrorResponse = null;

  public personNotFound: boolean = false;
  public personErrorFound: boolean = false;
  public errorMessage: string = '';

  @ViewChild('personHeader') personHeader!: PersonHeader;

  private routeSubscription: Subscription = new Subscription();
  private getPersonSubscription: Subscription = new Subscription();
  private endLoadingSubscription: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: TitleService,
    private personService: PersonService,
    private localStorageService: LocalStorageService,
    private cd: ChangeDetectorRef,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.cd.detectChanges();
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.getPerson();
    });
    this.endLoadingSubscription = this.loadingService.isEndLoading.subscribe((bool) => {
      if (this.person) {
        this.setPersonTitle();
      } else {
        if (this.personError.status && this.personError.status === 404) {
          this.titleService.setPersonNotFoundTitle();
        } else {
          this.titleService.setPersonServiceErrorTitle();
        }
      }

    });
  }

  ngAfterContentInit(): void {
    this.cd.detectChanges();
  }

  private getPerson(): void {
    this.personErrorFound = false;
    this.personService.getPerson(this.id)
    this.getPersonSubscription = this.personService.getPerson(this.id).subscribe({
      next: (person) => {
        this.person = person;
        this.localStorageService.setItem("person", person);
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {
      }
    });
  }

  private handleError(error: HttpErrorResponse): void {
    this.personErrorFound = true;
    this.personError = error;
    if (error.status && error.status === 404) {
      this.personNotFound = true;
    } else {
      this.errorMessage = error.message;
    }
  }

  public reloadPerson(event: boolean): void {
    this.getPerson();
  }

  private setPersonTitle(): void {
    this.titleService.setPersonOverviewTitle(this.person.name);
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.getPersonSubscription) {
      this.getPersonSubscription.unsubscribe();
    }
    if (this.endLoadingSubscription) {
      this.endLoadingSubscription.unsubscribe();
    }
  }

}
