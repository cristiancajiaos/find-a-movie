import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ResponsePersonCrewCredit } from '../../../classes/person-movie-credits/response-person-crew-credit';
import { LocalStorageService } from '../../../services/local-storage-service';
import { Person } from '../../../classes/person';
import { OrderCriteria } from '../../../interfaces/order-criteria';
import { NgSelectComponent } from '@ng-select/ng-select';
import { faCircleInfo, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import { Order } from '../../../enums/order';
import { OrderSelect } from '../../../components/shared/order-select/order-select';

@Component({
  selector: 'app-person-movie-credits-crew',
  standalone: false,
  templateUrl: './person-movie-credits-crew.html',
  styleUrl: './person-movie-credits-crew.scss'
})
export class PersonMovieCreditsCrew implements OnInit {

  public faCircleInfo: IconDefinition = faCircleInfo;
  public faArrowRotateLeft: IconDefinition = faArrowRotateLeft;
  public roles: string[] = [];

  public loadingPerson: boolean = false;

  public displayMode: string = 'grid';

  public selectedRoles: string[] = [];

  public orderCriterias: OrderCriteria[] = [
    {id: Order.DefaultOrder, orderCriteriaName: 'Default Order'},
    {id: Order.TitleAsc, orderCriteriaName: 'Title (ascending)'},
    {id: Order.TitleDesc, orderCriteriaName: 'Title (descending)'},
    {id: Order.JobAsc, orderCriteriaName: 'Job (ascending)'},
    {id: Order.JobDesc, orderCriteriaName: 'Job (descending)'},
    {id: Order.ReleaseDateAsc, orderCriteriaName: 'Release Date (ascending)'},
    {id: Order.ReleaseDateDesc, orderCriteriaName: 'Release Date (descending)'},
  ];

  public defaultOrder: OrderCriteria = this.orderCriterias[0];
  public selectedOrderCriteria: OrderCriteria = this.defaultOrder;

  public currentPerson!: Person;
  public filterCrewCredits: ResponsePersonCrewCredit[] = [];

  public page: number = 1;

  @Input() crewCredits: ResponsePersonCrewCredit[] = [];

  @ViewChild('crewParagraph') crewParagraph!: ElementRef;
  @ViewChild('orderSelectPersonCrewCredits') orderSelectPersonCrewCredits: OrderSelect;
  @ViewChild('selectRole') selectRole: NgSelectComponent;

  constructor(
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.filterCrewCredits = structuredClone(this.crewCredits);
    this.getPerson();
    this.setRoles();
  }

  public focusSelectRole(): void {
    this.selectRole.focus();
  }

  private setRoles(): void {
    const roles: string[] = this.crewCredits.map(crewCredit => crewCredit.job);
    this.roles = [...new Set(roles)];
  }

  private getPerson(): void {
    this.loadingPerson = true;
    this.currentPerson = this.localStorageService.getItem('person');
  }

  public changeFilterRoles(event: string[]): void {
    this.page = 1;
    if (this.selectedRoles.length > 0) {
      this.filterCrewCredits = this.crewCredits.filter(crewCredit => this.selectedRoles.includes(crewCredit.job));
    } else {
      this.filterCrewCredits = structuredClone(this.crewCredits);
    }
    if (this.selectedOrderCriteria.id != Order.DefaultOrder) {
      this.orderCriteriaChange(this.selectedOrderCriteria);
    }
  }

  public changePage(pageNumber: number) {
    this.page = pageNumber;
    this.crewParagraph.nativeElement.scrollIntoView({behaviour: 'smooth', block: 'start'});
  }

  public changeDisplay(display: string) {
    this.displayMode = display;
  }

  public orderCriteriaChange(orderCriteria: OrderCriteria) {
    this.selectedOrderCriteria = orderCriteria;
    if (orderCriteria.id == Order.DefaultOrder) {
      this.filterCrewCredits = structuredClone(this.crewCredits);
    } else if (orderCriteria.id == Order.TitleAsc) {
      this.filterCrewCredits.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
    } else if (orderCriteria.id == Order.TitleDesc) {
      this.filterCrewCredits.sort((a, b) => {
          return b.title.localeCompare(a.title);
        });
    } else if (orderCriteria.id == Order.JobAsc) {
      this.filterCrewCredits.sort((a, b) => {
          return a.job.localeCompare(b.job);
        });
    } else if (orderCriteria.id == Order.JobDesc) {
      this.filterCrewCredits.sort((a, b) => {
          return b.job.localeCompare(a.job);
        });
    } else if (orderCriteria.id == Order.ReleaseDateAsc) {
      this.filterCrewCredits.sort((a, b) => {
          const aDate: Date = new Date(a.release_date);
          const bDate: Date = new Date(b.release_date);
          return aDate.getTime() - bDate.getTime();
        });
    } else if (orderCriteria.id == Order.ReleaseDateDesc) {
      this.filterCrewCredits.sort((a, b) => {
          const aDate: Date = new Date(a.release_date);
          const bDate: Date = new Date(b.release_date);
          return bDate.getTime() - aDate.getTime();
        });
    }
  }

  public resetFiltersByDefault(): void {
    this.displayMode = 'grid';
    this.orderSelectPersonCrewCredits.setDefaultOrderCriteria();
    this.selectedRoles = [];
    this.page = 1;
  }
}
