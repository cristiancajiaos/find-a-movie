import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ResponsePersonCrewCredit } from '../../../classes/person-movie-credits/response-person-crew-credit';
import { LocalStorageService } from '../../../services/local-storage-service';
import { Person } from '../../../classes/person';
import { OrderCriteria } from '../../../interfaces/order-criteria';

@Component({
  selector: 'app-person-movie-credits-crew',
  standalone: false,
  templateUrl: './person-movie-credits-crew.html',
  styleUrl: './person-movie-credits-crew.scss'
})
export class PersonMovieCreditsCrew implements OnInit {

  @Input() crewCredits: ResponsePersonCrewCredit[] = [];

  @ViewChild('crewParagraph') crewParagraph!: ElementRef;

  public loadingPerson: boolean = false;

  public displayMode: string = 'grid';

  public orderCriterias: OrderCriteria[] = [
    {id: 1, orderCriteriaName: 'Default Order'},
    {id: 2, orderCriteriaName: 'Title (ascending)'},
    {id: 3, orderCriteriaName: 'Title (descending)'},
    {id: 4, orderCriteriaName: 'Job (ascending)'},
    {id: 5, orderCriteriaName: 'Job (descending)'},
    {id: 6, orderCriteriaName: 'Release Date (ascending)'},
    {id: 7, orderCriteriaName: 'Release Date (descending)'},
  ];

  public currentPerson!: Person;
  public filterCrewCredits: ResponsePersonCrewCredit[] = [];

  public page: number = 1;

  constructor(
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.filterCrewCredits = structuredClone(this.crewCredits);
    this.getPerson();

  }

  private getPerson(): void {
    this.loadingPerson = true;
    this.currentPerson = this.localStorageService.getItem('person');
  }

  public changePage(pageNumber: number) {
    this.page = pageNumber;
    this.crewParagraph.nativeElement.scrollIntoView({behaviour: 'smooth', block: 'start'});
  }

  public changeDisplay(display: string) {
    this.displayMode = display;
  }

  public orderCriteriaChange(orderCriteria: string) {
    switch(orderCriteria) {
      case '1': {
        this.filterCrewCredits = structuredClone(this.crewCredits);
        break;
      }

      case '2': {
        this.filterCrewCredits.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
        break;
      }

      case '3': {
        this.filterCrewCredits.sort((a, b) => {
          return b.title.localeCompare(a.title);
        });
        break;
      }

      case '4': {
        this.filterCrewCredits.sort((a, b) => {
          return a.job.localeCompare(b.job);
        });
        break;
      }

      case '5': {
        this.filterCrewCredits.sort((a, b) => {
          return b.job.localeCompare(a.job);
        });
        break;
      }

      case '6': {
        this.filterCrewCredits.sort((a, b) => {
          const aDate: Date = new Date(a.release_date);
          const bDate: Date = new Date(b.release_date);
          return aDate.getTime() - bDate.getTime();
        });
        break;
      }

      case '7': {
        this.filterCrewCredits.sort((a, b) => {
          const aDate: Date = new Date(a.release_date);
          const bDate: Date = new Date(b.release_date);
          return bDate.getTime() - aDate.getTime();
        });
        break;
      }
    }
  }
}
