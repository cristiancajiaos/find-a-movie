import { Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy, signal, input, WritableSignal, inject, InputSignal, AfterViewInit } from '@angular/core';
import { ResponsePersonCrewCredit } from '../../../../classes/person-movie-credits/response-person-crew-credit';
import { Person } from '../../../../classes/person';
import { FromSelect } from '../../../../components/shared/from-select/from-select';
import { ToSelect } from '../../../../components/shared/to-select/to-select';
import { RoleSelect } from '../../../../components/shared/role-select/role-select';
import { SessionStorageService } from '../../../../services/session-storage-service';
import { PersonCreditsQuery } from '../../../../classes/person/person-credits-query';
import { ShowXResults } from '../../../../components/shared/show-x-results/show-x-results';
import { SortSelect } from '../../../../components/shared/sort-select/sort-select';
import { SortCriteria } from '../../../../interfaces/sort-criteria';
import { Sort } from '../../../../enums/sort';

@Component({
  selector: 'app-person-movie-credits-crew',
  standalone: false,
  templateUrl: './person-movie-credits-crew.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './person-movie-credits-crew.scss',
})
export class PersonMovieCreditsCrew implements OnInit, AfterViewInit {

  private sessionStorageService = inject(SessionStorageService);

  public roles: WritableSignal<string[]> = signal([]);

  public currentPerson: WritableSignal<Person> = signal(null);

  public crewCreditsTitle: WritableSignal<string> = signal('Crew Credits');
  public crewCreditsText: WritableSignal<string> = signal('has been part of the production and/or technical staff in the following movies:');

  public displayMode: WritableSignal<string> = signal('grid');

  @ViewChild('personCrewCreditsShowXResults') personCrewCreditsShowXResults!: ShowXResults;
  public numberResultsOptions: WritableSignal<number[]> = signal([20, 40, 100]);
  public enabledNumberResultsParams: WritableSignal<string> = signal('Enabled queryParam resultsPerPage: 20, 40, 100 (other values are not valid)');

  @ViewChild('sortSelectPersonCrewCredits') sortSelectPersonCrewCredits: SortSelect;
  public sortCriterias: WritableSignal<SortCriteria[]> = signal([
    { id: Sort.TitleAsc, sortCriteriaName: 'Title - ascending' },
    { id: Sort.TitleDesc, sortCriteriaName: 'Title - descending' },
    { id: Sort.JobAsc, sortCriteriaName: 'Job - ascending' },
    { id: Sort.JobDesc, sortCriteriaName: 'Job - descending' },
    { id: Sort.ReleaseDateAsc, sortCriteriaName: 'Release date - ascending' },
    { id: Sort.ReleaseDateDesc, sortCriteriaName: 'Release date - descending' },
  ]);
  public defaultOrder: WritableSignal<SortCriteria> = signal({
    id: Sort.DefaultOrder,
    sortCriteriaName: 'Default Order',
  });
  public selectedSortCriteria: WritableSignal<SortCriteria> = signal(null);
  public enabledSortParams: WritableSignal<string> = signal('Enabled queryParams for sort: defaultOrder, titleAsc, titleDesc, jobAsc, jobDesc, releaseDateAsc, releaseDateDesc');

  @ViewChild('roleSelect') roleSelect: RoleSelect;
  public selectedRoles: WritableSignal<string[]> = signal([]);

  @ViewChild('fromSelect') fromSelect: FromSelect;
  public yearsFrom: WritableSignal<number[]> = signal([]);
  public fromYear: WritableSignal<number> = signal(null);

  @ViewChild('toSelect') toSelect: ToSelect;
  public yearsTo: WritableSignal<number[]> = signal([]);
  public lastYear: WritableSignal<number> = signal(null);
  public toYear: WritableSignal<number> = signal(null);

  public itemsPerPage: WritableSignal<number> = signal(20);
  public currentPage: WritableSignal<number> = signal(1);

  crewCredits: InputSignal<ResponsePersonCrewCredit[]> = input.required<ResponsePersonCrewCredit[]>();
  personCreditsQuery: InputSignal<PersonCreditsQuery> = input.required<PersonCreditsQuery>();

  @ViewChild('crewParagraph') crewParagraph!: ElementRef;

  public noResultsFilters: WritableSignal<string> = signal('No results were obtained by the applied filters.');

  ngOnInit(): void {
    this.getPerson();
    this.setRoles();
    this.setYearsLimit();
  }

  ngAfterViewInit(): void {
    this.setResultsPerPage();
    this.setOrderParam();
    this.setRolesParam();
    this.setYearFromParam();
    this.setYearToParam();
  }

  private getPerson(): void {
    this.currentPerson.set(this.sessionStorageService.getItem('person'));
  }

  private setRoles(): void {
    const roles: string[] = this.crewCredits().map((crewCredit) => crewCredit.job);
    this.roles.set([...new Set(roles)]);
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

  private setResultsPerPage(): void {
    if (this.personCreditsQuery().resultsPerPage) {
      if (
        this.personCrewCreditsShowXResults
          .resultsOptions()
          .includes(this.personCreditsQuery().resultsPerPage)
      ) {
        this.itemsPerPage.set(this.personCreditsQuery().resultsPerPage);
        this.personCrewCreditsShowXResults.setXResults(this.itemsPerPage());
      }
    }
  }

  private setOrderParam(): void {
    console.log('setOrderParam()');
    let sortCriteria: SortCriteria = null;

    if (this.personCreditsQuery().sort == 'defaultOrder') {
      sortCriteria = { id: Sort.DefaultOrder, sortCriteriaName: 'Default order' };
    } else if (this.personCreditsQuery().sort == 'titleAsc') {
      sortCriteria = { id: Sort.TitleAsc, sortCriteriaName: 'Title - ascending' };
    } else if (this.personCreditsQuery().sort == 'titleDesc') {
      sortCriteria = { id: Sort.TitleDesc, sortCriteriaName: 'Title - descending' };
    } else if (this.personCreditsQuery().sort == 'jobAsc') {
      sortCriteria = { id: Sort.JobAsc, sortCriteriaName: 'Job - ascending' };
    } else if (this.personCreditsQuery().sort == 'jobDesc') {
      sortCriteria = { id: Sort.JobDesc, sortCriteriaName: 'Job - descending' };
    } else if (this.personCreditsQuery().sort == 'releaseDateAsc') {
      sortCriteria = { id: Sort.ReleaseDateAsc, sortCriteriaName: 'Release date - ascending' };
    } else if (this.personCreditsQuery().sort == 'releaseDateDesc') {
      sortCriteria = { id: Sort.ReleaseDateDesc, sortCriteriaName: 'Release date - descending' };
    }

    console.log(sortCriteria);

    if (sortCriteria) {
      this.selectedSortCriteria.set(sortCriteria);
      this.sortSelectPersonCrewCredits.setSortCriteria(sortCriteria);
    }
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

  private resetToPageOne(): void {
    this.currentPage.set(1);
  }

  public changeDisplay(display: string) {
    this.displayMode.set(display);
  }

  public changeItemsPerPage(itemsPerPage: number) {
    this.itemsPerPage.set(itemsPerPage);
    this.resetToPageOne();
  }


  public sortCriteriaChange(sortCriteria: SortCriteria) {
    this.selectedSortCriteria.set(sortCriteria);
    this.resetToPageOne();
  }

  public clearSortCriteria(event: boolean): void {
    this.selectedSortCriteria.set(null);
    this.resetToPageOne();
  }

  public defineSelectedRoles(roles: string[]): void {
    this.selectedRoles.set(roles);
    this.resetToPageOne();
  }

  public clearRoleSelect(event: boolean): void {
    this.selectedRoles.set([]);
    this.resetToPageOne();
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
      this.resetToPageOne();
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
    this.resetToPageOne();
  }

  public setYearTo(year: number): void {
    this.toYear.set(year ? year : null);
    this.toSelect.setYearTo(year);
    this.resetToPageOne();
  }

  public clearSelectYearTo(event: boolean) {
    this.setYearFrom(this.fromYear());
    this.resetToPageOne();
  }

  public changePage(pageNumber: number) {
    this.currentPage.set(pageNumber);
    this.crewParagraph.nativeElement.scrollIntoView({ behaviour: 'smooth', block: 'start' });
  }

  public resetFiltersByDefault(event: boolean): void {
    this.displayMode.set('grid');
    this.itemsPerPage.set(20);
    this.personCrewCreditsShowXResults.setDefaultValue();
    this.sortSelectPersonCrewCredits.clearSortCriteria();
    this.roleSelect.clearRoleSelect();
    this.selectedRoles.set([]);
    this.clearSelectYearFrom(true);
    this.resetToPageOne();
  }
}
