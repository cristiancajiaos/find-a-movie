import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ResponsePersonCastCredit } from '../../../classes/person-movie-credits/response-person-cast-credit';
import { LocalStorageService } from '../../../services/local-storage-service';
import { Person } from '../../../classes/person';
import { faGrip, faList, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { OrderCriteria } from '../../../interfaces/order-criteria';

@Component({
  selector: 'app-person-movie-credits-cast',
  standalone: false,
  templateUrl: './person-movie-credits-cast.html',
  styleUrl: './person-movie-credits-cast.scss'
})
export class PersonMovieCreditsCast implements OnInit {

  public gridIcon: IconDefinition = faGrip;
  public listIcon: IconDefinition = faList;

  @Input() castCredits: ResponsePersonCastCredit[] = [];

  @ViewChild('starringParagraph') starringParagraph!: ElementRef;
  @ViewChild('castCreditsList') castCreditsList!: ElementRef;

  public loadingPerson: boolean = false;

  public displayMode: string = 'grid';

  public orderCriterias: OrderCriteria[] = [
    {id: 1, orderCriteriaName: 'Default Order'},
    {id: 2, orderCriteriaName: 'Title (ascending)'},
    {id: 3, orderCriteriaName: 'Title (descending)'},
    {id: 4, orderCriteriaName: 'Character Name (ascending)'},
    {id: 5, orderCriteriaName: 'Character Name (descending)'},
    {id: 6, orderCriteriaName: 'Release Date (ascending)'},
    {id: 7, orderCriteriaName: 'Release Date (descending)'},
  ];

  public currentPerson!: Person;
  public filterCastCredits: ResponsePersonCastCredit[] = [];

  public page: number = 1;

  constructor(
    private localStorageService: LocalStorageService,
  ) {

  }

  ngOnInit(): void {
    this.filterCastCredits = structuredClone(this.castCredits);
    this.getPerson();
  }

  private getPerson(): void {
    this.loadingPerson = true;
    this.currentPerson = this.localStorageService.getItem('person');
  }

  public changePage(pageNumber: number) {
    this.page = pageNumber;
    this.starringParagraph.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  public changeDisplay(display: string) {
    this.displayMode = display;
  }

  public orderCriteriaChange(orderCriteria: string) {
    switch(orderCriteria) {
      case '1': {
        this.filterCastCredits = structuredClone(this.castCredits);
        break;
      }

      case '2': {
        this.filterCastCredits.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
        break;
      }

      case '3': {
        this.filterCastCredits.sort((a, b) => {
          return b.title.localeCompare(a.title);
        });
        break;
      }

      case '4': {
        this.filterCastCredits.sort((a, b) => {
          return a.character.localeCompare(b.character);
        });
        break;
      }

      case '5': {
        this.filterCastCredits.sort((a, b) => {
          return b.character.localeCompare(a.character);
        });
        break;
      }

      case '6': {
        this.filterCastCredits.sort((a, b) => {
          const aDate: Date = new Date(a.release_date);
          const bDate: Date = new Date(b.release_date);
          return aDate.getTime() - bDate.getTime();
        });
        break;
      }

      case '7': {
        this.filterCastCredits.sort((a, b) => {
          const aDate: Date = new Date(a.release_date);
          const bDate: Date = new Date(b.release_date);
          return bDate.getTime() - aDate.getTime();
        });
        break;
      }
    }
  }
}
