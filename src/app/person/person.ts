import { AfterContentInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from '../services/title-service';
import { Person } from '../classes/person';
import { PersonService } from '../services/person-service';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonHeader } from './person-header/person-header';

@Component({
  selector: 'app-person',
  standalone: false,
  templateUrl: './person.html',
  styleUrl: './person.scss'
})
export class PersonComponent implements OnInit, AfterContentInit {

  public id: number = 0;

  public person: Person = new Person();

  public loadingView: boolean = true;
  public loadingPerson: boolean = false;

  public personNotFound: boolean = false;
  public personError: boolean = false;
  public errorMessage: string = '';

  @ViewChild('personHeader') personHeader!: PersonHeader;

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: TitleService,
    private personService: PersonService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cd.detectChanges();
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.getPerson();
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
      this.setPersonTitle();
    }).catch((error: HttpErrorResponse) => {
      this.handleError(error);
    }).finally(() => {
      this.loadingPerson = false;
    });

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

  private setPersonTitle(): void {
    this.titleService.setTitle(this.person.name);
  }

}
