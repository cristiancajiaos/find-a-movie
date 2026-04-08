import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ResponsePersonCastCredit } from '../../../classes/person-movie-credits/response-person-cast-credit';
import { LocalStorageService } from '../../../services/local-storage-service';
import { Person } from '../../../classes/person';
import { faGrip, faList, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { OrderCriteria } from '../../../interfaces/order-criteria';
import { Order } from '../../../enums/order';
import { OrderSelect } from '../../../components/shared/order-select/order-select';

@Component({
  selector: 'app-person-movie-credits-cast',
  standalone: false,
  templateUrl: './person-movie-credits-cast.html',
  styleUrl: './person-movie-credits-cast.scss',
})
export class PersonMovieCreditsCast implements OnInit {

  public gridIcon: IconDefinition = faGrip;
  public listIcon: IconDefinition = faList;

  public loadingPerson: boolean = false;

  public displayMode: string = 'grid';

  public orderCriterias: OrderCriteria[] = [
    { id: Order.DefaultOrder, orderCriteriaName: 'Default Order' },
    { id: Order.TitleAsc, orderCriteriaName: 'Title (ascending)' },
    { id: Order.TitleDesc, orderCriteriaName: 'Title (descending)' },
    { id: Order.CharacterNameAsc, orderCriteriaName: 'Character Name (ascending)' },
    { id: Order.CharacterNameDesc, orderCriteriaName: 'Character Name (descending)' },
    { id: Order.ReleaseDateAsc, orderCriteriaName: 'Release Date (ascending)' },
    { id: Order.ReleaseDateDesc, orderCriteriaName: 'Release Date (descending)' },
  ];

  public currentPerson!: Person;
  public filterCastCredits: ResponsePersonCastCredit[] = [];

  public page: number = 1;

  @Input() castCredits: ResponsePersonCastCredit[] = [];

  @ViewChild('starringParagraph') starringParagraph!: ElementRef;
  @ViewChild('orderSelectPersonCastCredits') orderSelectPersonCastCredits: OrderSelect;
  @ViewChild('castCreditsList') castCreditsList!: ElementRef;

  constructor(private localStorageService: LocalStorageService) {}

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
    this.starringParagraph.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  public changeDisplay(display: string) {
    this.displayMode = display;
  }

  public orderCriteriaChange(orderCriteria: Order) {
    if (orderCriteria == Order.DefaultOrder) {
      this.filterCastCredits = structuredClone(this.castCredits);
    } else if (orderCriteria == Order.TitleAsc) {
      this.filterCastCredits.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    } else if (orderCriteria == Order.TitleDesc) {
      this.filterCastCredits.sort((a, b) => {
        return b.title.localeCompare(a.title);
      });
    } else if (orderCriteria == Order.CharacterNameAsc) {
      this.filterCastCredits.sort((a, b) => {
        return a.character.localeCompare(b.character);
      });
    } else if (orderCriteria == Order.CharacterNameDesc) {
      this.filterCastCredits.sort((a, b) => {
        return b.character.localeCompare(a.character);
      });
    } else if (orderCriteria == Order.ReleaseDateAsc) {
      this.filterCastCredits.sort((a, b) => {
        const aDate: Date = new Date(a.release_date);
        const bDate: Date = new Date(b.release_date);
        return aDate.getTime() - bDate.getTime();
      });
    } else if (orderCriteria == Order.ReleaseDateDesc) {
      this.filterCastCredits.sort((a, b) => {
        const aDate: Date = new Date(a.release_date);
        const bDate: Date = new Date(b.release_date);
        return bDate.getTime() - aDate.getTime();
      });
    }
  }
}
