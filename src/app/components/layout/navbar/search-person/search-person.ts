import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faMagnifyingGlass, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-person',
  standalone: false,
  templateUrl: './search-person.html',
  styleUrl: './search-person.scss'
})
export class SearchPerson implements OnInit {

  public searchIcon: IconDefinition = faMagnifyingGlass;

  public searchPersonForm: FormGroup = new FormGroup({});

  public placeholder: string = 'Eg. Steven Spielberg';
  public ariaLabel: string = 'Search Person';

  @ViewChild('searchPersonInput') searchPersonInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
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

}
