import { Component, ElementRef, inject, Input, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faList, faMagnifyingGlass, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ResponsePersonResult } from '../../../../classes/response-search-person/response-person-result';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { SearchService } from '../../../../services/search-service';
import { debounceTime, finalize, startWith, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-input-person',
  standalone: false,
  templateUrl: './search-input-person.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-input-person.scss'
})
export class SearchInputPerson implements OnInit, OnDestroy {

  private router = inject(Router);
  private searchService = inject(SearchService);

  public searchIcon: IconDefinition = faMagnifyingGlass;
  public resultsIcon: IconDefinition = faList;

  public originalPersonResults: ResponsePersonResult[] = [];
  public personResults: ResponsePersonResult[] = [];

  @Input() enableBorderRadius: boolean = false;
  @Input() dropdownMenuEnd: boolean = true;
  public personInput: FormControl = new FormControl('');
  public placeholder: string = 'Eg. Steven Spielberg';
  public ariaLabel: string = 'Search Person';
  @ViewChild('searchPersonInput') searchPersonInput: ElementRef;

  @ViewChild('personSearchDropdown') personSearchDropdown: NgbDropdown;

  private personResultsSubscription: Subscription;

  ngOnInit(): void {
    this.listenPersonInputChanges();
  }

  public listenPersonInputChanges(): void {
    this.personResultsSubscription = this.personInput.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap((personInput) => {
        return this.searchService.searchPersonInput(personInput)
      }),
      finalize(() => {})
    ).subscribe(results => {
      this.originalPersonResults = results;
      this.personResults = results.slice(0,5);
      this.showPersonDropdownBasedOnPersonInput();
    });
  }

  public showPersonDropdownBasedOnPersonInput(): void {
    const inputValue: string = this.personInput.value;
    if (inputValue.length >= 2) {
      this.openPersonSearchDropdown();
    } else {
      this.closePersonSearchDropdown();
    }
  }

  public processPersonSearch(): void {
    this.searchPersonInput.nativeElement.blur();
    const searchQuery: string = this.personInput.value;
    if (searchQuery.length == 0) {
      return;
    }
    this.router.navigate(['search', 'person', searchQuery]);
    this.closePersonSearchDropdown();
  }

  public togglePersonSearchDropdownBySearch(): void {
    this.closePersonSearchDropdown();
  }

  public togglePersonSearchDropdownByFocus(): void {
    if (this.personResults.length > 0) {
      this.togglePersonSearchDropdown();
    }
  }

  public openPersonSearchDropdown(): void {
    this.personSearchDropdown.open();
  }

  public closePersonSearchDropdown(): void {
    this.personSearchDropdown.close();
  }

  public togglePersonSearchDropdown(): void {
    this.personSearchDropdown.toggle();
  }

  public goToPersonClose(value: boolean): void {
    this.closePersonSearchDropdown();
  }

  ngOnDestroy(): void {
    if (this.personResultsSubscription) {
      this.personResultsSubscription.unsubscribe();
    }
  }
}
