import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ResponsePersonCastCredit } from '../../../../classes/person-movie-credits/response-person-cast-credit';
import { LocalStorageService } from '../../../../services/local-storage-service';
import { Person } from '../../../../classes/person';
import { faArrowRotateLeft, faFilter, faGrip, faList, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { OrderCriteria } from '../../../../interfaces/order-criteria';
import { Order } from '../../../../enums/order';
import { OrderSelect } from '../../../../components/shared/order-select/order-select';
import { FromSelect } from '../../../../components/shared/from-select/from-select';
import { ToSelect } from '../../../../components/shared/to-select/to-select';
import { PersonService } from '../../../../services/person-service';

@Component({
  selector: 'app-person-movie-credits-cast',
  standalone: false,
  templateUrl: './person-movie-credits-cast.html',
  styleUrl: './person-movie-credits-cast.scss',
})
export class PersonMovieCreditsCast implements OnInit {

  public gridIcon: IconDefinition = faGrip;
  public listIcon: IconDefinition = faList;
  public filterIcon: IconDefinition = faFilter;
  public arrowRotateLeftIcon: IconDefinition = faArrowRotateLeft;

  public loadingPerson: boolean = false;

  public displayMode: string = 'grid';

  public yearsFrom: number[] = [];
  public yearsTo: number[] = [];

  public fromYear: number = null;
  public toYear: number = null;
  public lastYear: number = null;

  public orderCriterias: OrderCriteria[] = [
    { id: Order.TitleAsc, orderCriteriaName: 'Title (ascending)' },
    { id: Order.TitleDesc, orderCriteriaName: 'Title (descending)' },
    { id: Order.CharacterNameAsc, orderCriteriaName: 'Character Name (ascending)' },
    { id: Order.CharacterNameDesc, orderCriteriaName: 'Character Name (descending)' },
    { id: Order.ReleaseDateAsc, orderCriteriaName: 'Release Date (ascending)' },
    { id: Order.ReleaseDateDesc, orderCriteriaName: 'Release Date (descending)' },
  ];

  public defaultOrder: OrderCriteria = {
    id: Order.DefaultOrder,
    orderCriteriaName: 'Default Order',
  };
  public selectedOrderCriteria: OrderCriteria = this.defaultOrder;

  public currentPerson!: Person;
  public filterCastCredits: ResponsePersonCastCredit[] = [];

  public page: number = 1;

  @Input() castCredits: ResponsePersonCastCredit[] = [];

  @ViewChild('castParagraph') castParagraph!: ElementRef;
  @ViewChild('orderSelectPersonCastCredits') orderSelectPersonCastCredits: OrderSelect;
  @ViewChild('castCreditsList') castCreditsList!: ElementRef;
  @ViewChild('fromSelect') fromSelect: FromSelect;
  @ViewChild('toSelect') toSelect: ToSelect;

  constructor(
    private localStorageService: LocalStorageService,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.filterCastCredits = structuredClone(this.castCredits);
    this.getPerson();
    this.setYearsLimit();
  }

  private getPerson(): void {
    this.loadingPerson = true;
    this.currentPerson = this.localStorageService.getItem('person');
  }

  private setYearsLimit(): void {
    let years: number[] = this.castCredits.map((castCredit) => {
      const date = new Date(castCredit.release_date);
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
        this.toSelect.yearsToSelectForm.controls['toYear'].enable();
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
    this.castParagraph.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  public filterCredits(): void {
    this.filterCastCredits = structuredClone(this.castCredits);
    if (this.fromYear) {
      if (this.toYear) {
        this.filterCastCredits = this.personService.filterCastCreditsByYearFromTo(
          this.filterCastCredits,
          this.fromYear,
          this.toYear);
      } else {
        this.filterCastCredits = this.personService.filterCastCreditsByYearFrom(
          this.filterCastCredits,
          this.fromYear
        );
      }
    }
    this.filterCastCredits = this.personService.orderCastCreditsByOrderCriteria(
      this.filterCastCredits,
      this.selectedOrderCriteria
    );
  }

  public resetFiltersByDefault(): void {
    this.page = 1;
    this.displayMode = 'grid';
    this.orderSelectPersonCastCredits.clearOrderCriteria();
    this.clearSelectYearFrom(true);
    this.filterCastCredits = structuredClone(this.castCredits);
  }
}
