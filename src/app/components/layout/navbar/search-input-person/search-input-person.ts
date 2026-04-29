import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faList, faMagnifyingGlass, faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ResponseSearchPerson } from '../../../../classes/response-search-person';
import { ResponsePersonResult } from '../../../../classes/response-search-person/response-person-result';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { SearchService } from '../../../../services/search-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-search-input-person',
  standalone: false,
  templateUrl: './search-input-person.html',
  styleUrl: './search-input-person.scss'
})
export class SearchInputPerson implements OnInit {

  public searchIcon: IconDefinition = faMagnifyingGlass;
  public loadingIcon: IconDefinition = faSpinner;
  public resultsIcon: IconDefinition = faList;

  public searchPersonForm: FormGroup = new FormGroup({});

  public searchError: boolean = false;
  public loadingSearchPerson: boolean = false;

  public responseSearchPerson: ResponseSearchPerson = new ResponseSearchPerson();
  public originalPersonResults: ResponsePersonResult[] = [];
  public personResults: ResponsePersonResult[] = [];

  public placeholder: string = 'Eg. Steven Spielberg';
  public ariaLabel: string = 'Search Person';

  @ViewChild('searchPersonInput') searchPersonInput: ElementRef;
  @ViewChild('personSearchDropdown') personSearchDropdown: NgbDropdown;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.searchPersonForm = this.fb.group({
      personSearch: new FormControl('')
    });
  }

  public processPersonSearch(): void {
    this.searchPersonInput.nativeElement.blur();
    const searchQuery: string = this.searchPersonForm.value['personSearch'];
    if (searchQuery.length == 0) {
      return;
    }
    this.router.navigate(['search', 'person', searchQuery]);
  }

  public togglePersonSearchDropdownBySearch(): void {
    this.closePersonDropdown();
  }

  public togglePersonSearchDropdownByInput(): void {
    const inputMovie: string = this.searchPersonForm.controls['personSearch'].value;
    if (inputMovie.length >= 2) {
      this.searchPerson();
      this.openPersonDropdown();
    } else {
      this.closePersonDropdown();
    }
  }

  public togglePersonSearchDropdownByClick(): void {
    if (this.personSearchDropdown.isOpen && this.personResults.length > 0) {
      this.togglePersonDropdown();
    }
  }

  public openPersonDropdown(): void {
    this.personSearchDropdown.open();
  }

  public closePersonDropdown(): void {
    this.personSearchDropdown.close();
  }

  public togglePersonDropdown(): void {
    this.personSearchDropdown.toggle();
  }

  public searchPerson(): void {
    const inputMovie: string = this.searchPersonForm.controls['personSearch'].value;
    this.personResults = [];
    this.searchError = false;
    this.loadingSearchPerson = true;
    this.searchService.searchPersonInput(inputMovie).then(responsePersonResults => {
      this.originalPersonResults = responsePersonResults;
      this.personResults = responsePersonResults.slice(0,5);
      this.loadingSearchPerson = false;
    });
  }

  public goToPersonClose(value: boolean): void {
    this.personSearchDropdown.close();
  }
}
