import { Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy, signal, input, WritableSignal, inject, InputSignal } from '@angular/core';
import { ResponsePersonCastCredit } from '../../../../classes/person-movie-credits/response-person-cast-credit';
import { Person } from '../../../../classes/person';
import { faArrowRotateLeft, faFilter, faGrip, faList, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { OrderCriteria } from '../../../../interfaces/order-criteria';
import { Order } from '../../../../enums/order';
import { OrderSelect } from '../../../../components/shared/order-select/order-select';
import { FromSelect } from '../../../../components/shared/from-select/from-select';
import { ToSelect } from '../../../../components/shared/to-select/to-select';
import { SessionStorageService } from '../../../../services/session-storage-service';

@Component({
  selector: 'app-person-movie-credits-cast',
  standalone: false,
  templateUrl: './person-movie-credits-cast.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './person-movie-credits-cast.scss',
})
export class PersonMovieCreditsCast implements OnInit {

  private sessionStorageService = inject(SessionStorageService);

  public gridIcon: IconDefinition = faGrip;
  public listIcon: IconDefinition = faList;
  public filterIcon: IconDefinition = faFilter;
  public arrowRotateLeftIcon: IconDefinition = faArrowRotateLeft;

  public loadingPerson: boolean = false;

  public displayMode: WritableSignal<string> = signal('grid');

  public yearsFrom: WritableSignal<number[]> = signal([]);
  public yearsTo: WritableSignal<number[]> = signal([]);

  public fromYear: WritableSignal<number> = signal(null);
  public toYear: WritableSignal<number> = signal(null);
  public lastYear: WritableSignal<number> = signal(null);

  public orderCriterias: WritableSignal<OrderCriteria[]> = signal([
    { id: Order.TitleAsc, orderCriteriaName: 'Title (ascending)' },
    { id: Order.TitleDesc, orderCriteriaName: 'Title (descending)' },
    { id: Order.CharacterNameAsc, orderCriteriaName: 'Character Name (ascending)' },
    { id: Order.CharacterNameDesc, orderCriteriaName: 'Character Name (descending)' },
    { id: Order.ReleaseDateAsc, orderCriteriaName: 'Release Date (ascending)' },
    { id: Order.ReleaseDateDesc, orderCriteriaName: 'Release Date (descending)' },
  ]);

  public defaultOrder: WritableSignal<OrderCriteria> = signal({
    id: Order.DefaultOrder,
    orderCriteriaName: 'Default Order',
  });

  public selectedOrderCriteria: WritableSignal<OrderCriteria | null> = signal(null);

  public currentPerson!: Person;

  public page: number = 1;

  castCredits: InputSignal<ResponsePersonCastCredit[]> = input.required<ResponsePersonCastCredit[]>();
  orderParam: InputSignal<string> = input<string>();

  @ViewChild('castParagraph') castParagraph!: ElementRef;
  @ViewChild('orderSelectPersonCastCredits') orderSelectPersonCastCredits: OrderSelect;
  @ViewChild('castCreditsList') castCreditsList!: ElementRef;
  @ViewChild('fromSelect') fromSelect: FromSelect;
  @ViewChild('toSelect') toSelect: ToSelect;

  ngOnInit(): void {
    this.getPerson();
    this.setYearsLimit();
    this.setOrderParam();
  }

  private getPerson(): void {
    this.loadingPerson = true;
    this.currentPerson = this.sessionStorageService.getItem('person');
  }

  private setOrderParam(): void {
    if (this.orderParam()) {
      switch (this.orderParam()) {
        case 'titleAsc': {
          this.selectedOrderCriteria.set({ id: Order.TitleAsc, orderCriteriaName: 'Title (ascending)' })
          this.orderSelectPersonCastCredits.orderCriteriaChange(this.selectedOrderCriteria());
          break;
        }

        case 'titleDesc': {
          this.selectedOrderCriteria.set({ id: Order.TitleDesc, orderCriteriaName: 'Title (descending)' })
          break;
        }

        default: {
          break;
        }
      }
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
    this.fromYear.set(null)
    this.toYear.set(null);
    this.yearsTo.set([]);
    this.fromSelect.yearsFromSelectForm.reset();
    this.toSelect.disableSelect();
  }

  public setYearTo(year: number): void {
    this.toYear.set(year);
  }

  public clearSelectYearTo(event: boolean) {
    this.setYearFrom(this.fromYear());
  }

  public changePage(pageNumber: number) {
    this.page = pageNumber;
    this.castParagraph.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  public changeDisplay(display: string) {
    this.displayMode.set(display);
  }

  public orderCriteriaChange(orderCriteria: OrderCriteria) {
    this.selectedOrderCriteria.set(orderCriteria);
    this.page = 1;
  }

  public clearOrderCriteria(event: boolean): void {
    this.selectedOrderCriteria.set(null);
    this.page = 1;
  }

  public resetFiltersByDefault(): void {
    this.page = 1;
    this.displayMode.set('grid');
    this.orderSelectPersonCastCredits.clearOrderCriteria();
    this.clearSelectYearFrom(true);
    this.selectedOrderCriteria.set(null);
  }
}
