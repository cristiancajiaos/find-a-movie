import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  signal,
  input,
  WritableSignal,
  inject,
  InputSignal,
  AfterViewInit,
  OnDestroy,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { ResponsePersonCastCredit } from '../../../../classes/person-movie-credits/response-person-cast-credit';
import { Person } from '../../../../classes/person';
import { OrderCriteria } from '../../../../interfaces/order-criteria';
import { Order } from '../../../../enums/order';
import { OrderSelect } from '../../../../components/shared/order-select/order-select';
import { FromSelect } from '../../../../components/shared/from-select/from-select';
import { ToSelect } from '../../../../components/shared/to-select/to-select';
import { SessionStorageService } from '../../../../services/session-storage-service';
import { PersonCreditsQuery } from '../../../../classes/person/person-credits-query';
import { Subscription } from 'rxjs';
import { ShowXResults } from '../../../../components/shared/show-x-results/show-x-results';

@Component({
  selector: 'app-person-movie-credits-cast',
  standalone: false,
  templateUrl: './person-movie-credits-cast.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './person-movie-credits-cast.scss',
})
export class PersonMovieCreditsCast implements OnInit, AfterViewInit, OnDestroy {

  private sessionStorageService = inject(SessionStorageService);

  public currentPerson!: Person;
  public loadingPerson: boolean = false;

  public displayMode: WritableSignal<string> = signal('grid');

  @ViewChild('personCastCreditsShowXResults') personCastCreditsShowXResults!: ShowXResults;
  public numberResultsOptions: WritableSignal<number[]> = signal([20, 40, 100]);
  public enabledNumberResultsParams: WritableSignal<string> = signal('Enabled queryParam resultsPerPage: 20, 40, 100 (other values are not valid)');

  @ViewChildren('orderSelectPersonCastCredits')
  orderSelectPersonCastCredits: QueryList<OrderSelect>;
  public orderCriterias: WritableSignal<OrderCriteria[]> = signal([
    { id: Order.DefaultOrder, orderCriteriaName: 'Default order' },
    { id: Order.TitleAsc, orderCriteriaName: 'Title - ascending' },
    { id: Order.TitleDesc, orderCriteriaName: 'Title - descending' },
    { id: Order.CharacterNameAsc, orderCriteriaName: 'Character name - ascending' },
    { id: Order.CharacterNameDesc, orderCriteriaName: 'Character name - descending' },
    { id: Order.ReleaseDateAsc, orderCriteriaName: 'Release date - ascending' },
    { id: Order.ReleaseDateDesc, orderCriteriaName: 'Release date - descending' },
  ]);
  public defaultOrder: WritableSignal<OrderCriteria> = signal({
    id: Order.DefaultOrder,
    orderCriteriaName: 'Default Order',
  });
  public selectedOrderCriteria: WritableSignal<OrderCriteria | null> = signal(null);
  public enabledOrderParams: WritableSignal<string> = signal(
    'Enabled queryParams for order: defaultOrder, titleAsc, titleDesc, characterNameAsc, characterNameDesc, releaseDateAsc, releaseDateDesc',
  );

  @ViewChild('fromSelect') fromSelect: FromSelect;
  public yearsFrom: WritableSignal<number[]> = signal([]);
  public fromYear: WritableSignal<number> = signal(null);

  @ViewChild('toSelect') toSelect: ToSelect;
  public yearsTo: WritableSignal<number[]> = signal([]);
  public lastYear: WritableSignal<number> = signal(null);
  public toYear: WritableSignal<number> = signal(null);

  public itemsPerPage: WritableSignal<number> = signal(20);
  public currentPage: WritableSignal<number> = signal(1);

  castCredits: InputSignal<ResponsePersonCastCredit[]> =
    input.required<ResponsePersonCastCredit[]>();
  personCreditsQuery: InputSignal<PersonCreditsQuery> = input.required<PersonCreditsQuery>();

  @ViewChild('castParagraph') castParagraph!: ElementRef;

  private orderSelectPersonCastCreditsSubscription: Subscription = new Subscription();

  public noResultsFilters: WritableSignal<string> = signal('No results were obtained by the applied filters.');

  ngOnInit(): void {
    this.getPerson();
    this.setYearsLimit();
  }

  ngAfterViewInit(): void {
    this.setResultsPerPage();
    this.setOrderParam();
    this.setYearFromParam();
    this.setYearToParam();
  }

  private getPerson(): void {
    this.loadingPerson = true;
    this.currentPerson = this.sessionStorageService.getItem('person');
  }

  private setResultsPerPage(): void {
    if (this.personCreditsQuery().resultsPerPage) {
      if (
        this.numberResultsOptions().includes(this.personCreditsQuery().resultsPerPage)
      ) {
        this.itemsPerPage.set(this.personCreditsQuery().resultsPerPage);
        this.personCastCreditsShowXResults.setXResults(this.itemsPerPage());
      }
    }
  }

  private setOrderParam(): void {
    let orderCriteria: OrderCriteria = null;

    if (this.personCreditsQuery().order == 'defaultOrder') {
      orderCriteria = { id: Order.DefaultOrder, orderCriteriaName: 'Default order' };
    } else if (this.personCreditsQuery().order == 'titleAsc') {
      orderCriteria = { id: Order.TitleAsc, orderCriteriaName: 'Title - ascending' };
    } else if (this.personCreditsQuery().order == 'titleDesc') {
      orderCriteria = { id: Order.TitleDesc, orderCriteriaName: 'Title - descending' };
    } else if (this.personCreditsQuery().order == 'characterNameAsc') {
      orderCriteria = {
        id: Order.CharacterNameAsc,
        orderCriteriaName: 'Character name - ascending',
      };
    } else if (this.personCreditsQuery().order == 'characterNameDesc') {
      orderCriteria = {
        id: Order.CharacterNameDesc,
        orderCriteriaName: 'Character name - descending',
      };
    } else if (this.personCreditsQuery().order == 'releaseDateAsc') {
      orderCriteria = { id: Order.ReleaseDateAsc, orderCriteriaName: 'Release date - ascending' };
    } else if (this.personCreditsQuery().order == 'releaseDateDesc') {
      orderCriteria = { id: Order.ReleaseDateDesc, orderCriteriaName: 'Release date -descending' };
    }

    if (orderCriteria) {
      this.selectedOrderCriteria.set(orderCriteria);
    }

    this.orderSelectPersonCastCredits.first.setOrderCriteria(orderCriteria);
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

  private setYearsLimit(): void {
    let years: number[] = this.castCredits().map((castCredit) => {
      const date = new Date(castCredit.release_date);
      return date.getFullYear();
    });
    const firstYear: number = years
      .filter((year) => !isNaN(year))
      .reduce((min, year) => (year < min ? year : min));
    this.lastYear.set(
      years.filter((year) => !isNaN(year)).reduce((max, year) => (year > max ? year : max)),
    );
    for (let i = firstYear; i <= this.lastYear(); i++) {
      this.yearsFrom.update((numbers) => [...numbers, i]);
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
      this.fromYear = null;
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
    this.toYear.set(year);
    this.toSelect.setYearTo(year);
  }

  public clearSelectYearTo(event: boolean) {
    this.setYearFrom(this.fromYear());
  }

  public changeDisplay(display: string) {
    this.displayMode.set(display);
  }

  public orderCriteriaChange(orderCriteria: OrderCriteria) {
    this.selectedOrderCriteria.set(orderCriteria);
    this.currentPage.set(1);
  }

  public clearOrderCriteria(event: boolean): void {
    this.selectedOrderCriteria.set(null);
    this.currentPage.set(1);
  }

  public resetFiltersByDefault(event: boolean): void {
    this.itemsPerPage.set(20);
    this.personCastCreditsShowXResults.setDefaultValue();
    this.currentPage.set(1);
    this.displayMode.set('grid');
    this.orderSelectPersonCastCredits.first.clearOrderCriteria();
    this.clearSelectYearFrom(true);
    this.selectedOrderCriteria.set(null);
  }

  public changeItemsPerPage(itemsPerPage: number) {
    this.itemsPerPage.set(itemsPerPage);
    this.currentPage.set(1);
  }

  public changePage(pageNumber: number) {
    this.currentPage.set(pageNumber);
    this.castParagraph.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  ngOnDestroy(): void {
    if (this.orderSelectPersonCastCreditsSubscription) {
      this.orderSelectPersonCastCreditsSubscription.unsubscribe();
    }
  }
}
