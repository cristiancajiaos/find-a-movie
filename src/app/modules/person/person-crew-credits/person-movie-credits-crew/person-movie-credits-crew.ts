import { Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy, signal, input, WritableSignal, inject, InputSignal, AfterViewInit } from '@angular/core';
import { ResponsePersonCrewCredit } from '../../../../classes/person-movie-credits/response-person-crew-credit';
import { Person } from '../../../../classes/person';
import { OrderCriteria } from '../../../../interfaces/order-criteria';
import { faCircleInfo, faArrowRotateLeft, faFilter } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import { Order } from '../../../../enums/order';
import { OrderSelect } from '../../../../components/shared/order-select/order-select';
import { FromSelect } from '../../../../components/shared/from-select/from-select';
import { ToSelect } from '../../../../components/shared/to-select/to-select';
import { RoleSelect } from '../../../../components/shared/role-select/role-select';
import { SessionStorageService } from '../../../../services/session-storage-service';
import { PersonCreditsQuery } from '../../../../classes/person/person-credits-query';

@Component({
  selector: 'app-person-movie-credits-crew',
  standalone: false,
  templateUrl: './person-movie-credits-crew.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './person-movie-credits-crew.scss',
})
export class PersonMovieCreditsCrew implements OnInit, AfterViewInit {

  private sessionStorageService = inject(SessionStorageService);

  public faCircleInfo: IconDefinition = faCircleInfo;
  public arrowRotateLeftIcon: IconDefinition = faArrowRotateLeft;
  public filterIcon: IconDefinition = faFilter;

  public roles: WritableSignal<string[]> = signal([]);

  public loadingPerson: boolean = false;

  public displayMode: WritableSignal<string> = signal('grid');

  public selectedRoles: WritableSignal<string[]> = signal([]);
  public yearsFrom: WritableSignal<number[]> = signal([]);
  public yearsTo: WritableSignal<number[]> = signal([]);

  public fromYear: WritableSignal<number> = signal(null);
  public toYear: WritableSignal<number> = signal(null);
  public lastYear: WritableSignal<number> = signal(null);

  public orderCriterias: WritableSignal<OrderCriteria[]> = signal([
    { id: Order.TitleAsc, orderCriteriaName: 'Title (ascending)' },
    { id: Order.TitleDesc, orderCriteriaName: 'Title (descending)' },
    { id: Order.JobAsc, orderCriteriaName: 'Job (ascending)' },
    { id: Order.JobDesc, orderCriteriaName: 'Job (descending)' },
    { id: Order.ReleaseDateAsc, orderCriteriaName: 'Release Date (ascending)' },
    { id: Order.ReleaseDateDesc, orderCriteriaName: 'Release Date (descending)' },
  ]);

  public defaultOrder: WritableSignal<OrderCriteria> = signal({
    id: Order.DefaultOrder,
    orderCriteriaName: 'Default Order',
  });

  public selectedOrderCriteria: WritableSignal<OrderCriteria> = signal(null);

  public currentPerson!: Person;

  public page: number = 1;

  crewCredits: InputSignal<ResponsePersonCrewCredit[]> = input.required<ResponsePersonCrewCredit[]>();
  personCreditsQuery: InputSignal<PersonCreditsQuery> = input.required<PersonCreditsQuery>();

  @ViewChild('crewParagraph') crewParagraph!: ElementRef;
  @ViewChild('orderSelectPersonCrewCredits') orderSelectPersonCrewCredits: OrderSelect;
  @ViewChild('roleSelect') roleSelect: RoleSelect;
  @ViewChild('fromSelect') fromSelect: FromSelect;
  @ViewChild('toSelect') toSelect: ToSelect;

  ngOnInit(): void {
    this.getPerson();
    this.setRoles();
    this.setYearsLimit();
  }

  ngAfterViewInit(): void {
    this.setOrderParam();
    this.setRolesParam();
    this.setYearFromParam();
    this.setYearToParam();
  }

  private setRoles(): void {
    const roles: string[] = this.crewCredits().map((crewCredit) => crewCredit.job);
    this.roles.set([...new Set(roles)]);
  }

  private getPerson(): void {
    this.loadingPerson = true;
    this.currentPerson = this.sessionStorageService.getItem('person');
  }

  private setOrderParam(): void {
    let orderCriteria: OrderCriteria = null;

    if (this.personCreditsQuery().order == 'defaultOrder') {
      orderCriteria = { id: Order.DefaultOrder, orderCriteriaName: 'Default order' };
    } else if (this.personCreditsQuery().order == 'titleAsc') {
      orderCriteria = { id: Order.TitleAsc, orderCriteriaName: 'Title (ascending)' };
    } else if (this.personCreditsQuery().order == 'titleDesc') {
      orderCriteria = { id: Order.TitleDesc, orderCriteriaName: 'Title (descending)' };
    } else if (this.personCreditsQuery().order == 'jobAsc') {
      orderCriteria = { id: Order.JobAsc, orderCriteriaName: 'Job (ascending)' };
    } else if (this.personCreditsQuery().order == 'jobDesc') {
      orderCriteria = { id: Order.JobDesc, orderCriteriaName: 'Job (descending)' };
    } else if (this.personCreditsQuery().order == 'releaseDateAsc') {
      orderCriteria = { id: Order.ReleaseDateAsc, orderCriteriaName: 'Release Date (ascending)' };
    } else if (this.personCreditsQuery().order == 'releaseDateDesc') {
      orderCriteria = { id: Order.ReleaseDateDesc, orderCriteriaName: 'Release Date (descending)' };
    }

    if (orderCriteria) {
      this.selectedOrderCriteria.set(orderCriteria);
    }

    this.orderSelectPersonCrewCredits.setOrderCriteria(orderCriteria);
  }

  private setRolesParam(): void {
    const roles = this.personCreditsQuery().roles;
    if (roles && roles.length > 0) {
      this.roleSelect.setRoles(roles);
      this.defineSelectedRoles(roles);
    }
  }

  private setYearFromParam(): void {
    if (this.personCreditsQuery().fromYear) {
      this.setYearFrom(this.personCreditsQuery().fromYear);
    }
  }

  private setYearToParam(): void {
    if (this.personCreditsQuery().toYear) {
      this.setYearTo(this.personCreditsQuery().toYear);
    }
  }

  public defineSelectedRoles(roles: string[]): void {
    this.selectedRoles.set(roles);
  }

  private setYearsLimit(): void {
    let years: number[] = this.crewCredits().map((crewCredit) => {
      const date = new Date(crewCredit.release_date);
      return date.getFullYear();
    });
    const firstYear: number = years
      .filter((year) => !isNaN(year))
      .reduce((min, year) => (year < min ? year : min));
    this.lastYear.set(years
      .filter((year) => !isNaN(year))
      .reduce((max, year) => (year > max ? year : max)));
    for (let i = firstYear; i <= this.lastYear(); i++) {
      this.yearsFrom.update(numbers => [...numbers, i]);
    }
  }

  public setYearFrom(year: number): void {
    if (year) {
      this.fromYear.set(year);
      this.fromSelect.setYearFrom(year);
      let yearsTo: number[] = [];
      this.toSelect.yearsToSelectForm.reset();
      for (let i = year; i <= this.lastYear(); i++) {
        yearsTo.push(i);
        this.toSelect.enableSelect();
      }
      if (year) {
        this.yearsTo.set(structuredClone(yearsTo));
      }
    } else {
      this.fromYear.set(null);
    }
  }

  public clearSelectYearFrom(event: boolean) {
    this.fromYear.set(null);
    this.toYear.set(null);
    this.yearsTo.set([]);
    this.fromSelect.yearsFromSelectForm.reset();
    this.toSelect.disableSelect();
  }

  public setYearTo(year: number): void {
    this.toYear.set(year ? year : null);
    this.toSelect.setYearTo(year);
  }

  public clearSelectYearTo(event: boolean) {
    this.setYearFrom(this.fromYear());
  }

  public changePage(pageNumber: number) {
    this.page = pageNumber;
    this.crewParagraph.nativeElement.scrollIntoView({ behaviour: 'smooth', block: 'start' });
  }

  public changeDisplay(display: string) {
    this.displayMode.set(display);
  }

  public orderCriteriaChange(orderCriteria: OrderCriteria) {
    this.selectedOrderCriteria.set(orderCriteria);
  }

  public clearOrderCriteria(event: boolean): void {
    this.selectedOrderCriteria.set(null);
  }

  public clearRoleSelect(event: boolean): void {
    this.selectedRoles.set([]);
  }

  public resetFiltersByDefault(): void {
    this.page = 1;
    this.displayMode.set('grid');
    this.orderSelectPersonCrewCredits.clearOrderCriteria();
    this.roleSelect.clearRoleSelect();
    this.selectedRoles.set([]);
    this.clearSelectYearFrom(true);
  }
}
