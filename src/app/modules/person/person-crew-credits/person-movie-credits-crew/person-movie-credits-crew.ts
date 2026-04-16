import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ResponsePersonCrewCredit } from '../../../../classes/person-movie-credits/response-person-crew-credit';
import { LocalStorageService } from '../../../../services/local-storage-service';
import { Person } from '../../../../classes/person';
import { OrderCriteria } from '../../../../interfaces/order-criteria';
import { faCircleInfo, faArrowRotateLeft, faFilter } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import { Order } from '../../../../enums/order';
import { OrderSelect } from '../../../../components/shared/order-select/order-select';
import { FromSelect } from '../../../../components/shared/from-select/from-select';
import { ToSelect } from '../../../../components/shared/to-select/to-select';
import { PersonService } from '../../../../services/person-service';
import { RoleSelect } from '../../../../components/shared/role-select/role-select';

@Component({
  selector: 'app-person-movie-credits-crew',
  standalone: false,
  templateUrl: './person-movie-credits-crew.html',
  styleUrl: './person-movie-credits-crew.scss',
})
export class PersonMovieCreditsCrew implements OnInit {
  public faCircleInfo: IconDefinition = faCircleInfo;
  public arrowRotateLeftIcon: IconDefinition = faArrowRotateLeft;
  public filterIcon: IconDefinition = faFilter;

  public roles: string[] = [];

  public loadingPerson: boolean = false;

  public displayMode: string = 'grid';

  public selectedRoles: string[] = [];
  public yearsFrom: number[] = [];
  public yearsTo: number[] = [];

  public fromYear: number = null;
  public toYear: number = null;
  public lastYear: number = null;

  public orderCriterias: OrderCriteria[] = [
    { id: Order.TitleAsc, orderCriteriaName: 'Title (ascending)' },
    { id: Order.TitleDesc, orderCriteriaName: 'Title (descending)' },
    { id: Order.JobAsc, orderCriteriaName: 'Job (ascending)' },
    { id: Order.JobDesc, orderCriteriaName: 'Job (descending)' },
    { id: Order.ReleaseDateAsc, orderCriteriaName: 'Release Date (ascending)' },
    { id: Order.ReleaseDateDesc, orderCriteriaName: 'Release Date (descending)' },
  ];

  public defaultOrder: OrderCriteria = {
    id: Order.DefaultOrder,
    orderCriteriaName: 'Default Order',
  };
  public selectedOrderCriteria: OrderCriteria = this.defaultOrder;

  public currentPerson!: Person;
  public filterCrewCredits: ResponsePersonCrewCredit[] = [];

  public page: number = 1;

  @Input() crewCredits: ResponsePersonCrewCredit[] = [];

  @ViewChild('crewParagraph') crewParagraph!: ElementRef;
  @ViewChild('orderSelectPersonCrewCredits') orderSelectPersonCrewCredits: OrderSelect;
  @ViewChild('roleSelect') roleSelect: RoleSelect;
  @ViewChild('fromSelect') fromSelect: FromSelect;
  @ViewChild('toSelect') toSelect: ToSelect;

  constructor(
    private localStorageService: LocalStorageService,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.filterCrewCredits = structuredClone(this.crewCredits);
    this.getPerson();
    this.setRoles();
    this.setYearsLimit();
  }

  private setRoles(): void {
    const roles: string[] = this.crewCredits.map((crewCredit) => crewCredit.job);
    this.roles = [...new Set(roles)];
  }

  private getPerson(): void {
    this.loadingPerson = true;
    this.currentPerson = this.localStorageService.getItem('person');
  }

  public defineSelectedRoles(roles: string[]): void {
    this.selectedRoles = roles;
  }

  private setYearsLimit(): void {
    let years: number[] = this.crewCredits.map((crewCredit) => {
      const date = new Date(crewCredit.release_date);
      return date.getFullYear();
    });
    const firstYear: number = years
      .filter((year) => !isNaN(year))
      .reduce((min, year) => (year < min ? year : min));
    this.lastYear = years
      .filter((year) => !isNaN(year))
      .reduce((max, year) => (year > max ? year : max));
    for (let i = firstYear; i <= this.lastYear; i++) {
      this.yearsFrom.push(i);
    }
  }

  public setYearFrom(year: number): void {
    if (year) {
      this.fromYear = year;
      let yearsTo: number[] = [];
      this.toSelect.yearsToSelectForm.reset();
      for (let i = year; i <= this.lastYear; i++) {
        yearsTo.push(i);
        this.toSelect.enableSelect();
      }
      if (year) {
        this.yearsTo = structuredClone(yearsTo);
      }
    } else {
      this.fromYear = null;
    }
  }

  public clearSelectYearFrom(event: boolean) {
    this.fromYear = null;
    this.toYear = null;
    this.yearsTo = [];
    this.fromSelect.yearsFromSelectForm.reset();
    this.toSelect.disableSelect();
  }

  public setYearTo(year: number): void {
    this.toYear = year ? year : null;
  }

  public clearSelectYearTo(event: boolean) {
    this.setYearFrom(this.fromYear);
  }

  public changePage(pageNumber: number) {
    this.page = pageNumber;
    this.crewParagraph.nativeElement.scrollIntoView({ behaviour: 'smooth', block: 'start' });
  }

  public changeDisplay(display: string) {
    this.displayMode = display;
  }

  public orderCriteriaChange(orderCriteria: OrderCriteria) {
    this.selectedOrderCriteria = orderCriteria ? orderCriteria : null;
  }

  public clearOrderCriteria(event: boolean): void {
    this.selectedOrderCriteria = this.defaultOrder;
  }

  public clearRoleSelect(event: boolean): void {
    this.selectedRoles = [];
  }

  public filterCredits(): void {
    this.page = 1;
    this.filterCrewCredits = structuredClone(this.crewCredits);
    if (this.selectedRoles.length > 0) {
      this.filterCrewCredits = this.personService.filterCrewCreditsByRole(
        this.filterCrewCredits,
        this.selectedRoles);
    }
    if (this.fromYear) {
      if (this.toYear) {
        this.filterCrewCredits = this.personService.filterCrewCreditsByYearFromTo(
          this.filterCrewCredits,
          this.fromYear,
          this.toYear);
      } else {
        this.filterCrewCredits = this.personService.filterCrewCreditsByYearFrom(
          this.filterCrewCredits,
          this.fromYear);
      }
    }
    this.filterCrewCredits = this.personService.orderCrewCreditsByOrderCriteria(
      this.filterCrewCredits,
      this.selectedOrderCriteria
    );

  }

  public resetFiltersByDefault(): void {
    this.page = 1;
    this.displayMode = 'grid';
    this.orderSelectPersonCrewCredits.clearOrderCriteria();
    this.roleSelect.clearRoleSelect();
    this.selectedRoles = [];
    this.clearSelectYearFrom(true);
    this.filterCrewCredits = structuredClone(this.crewCredits);
  }
}
