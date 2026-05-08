import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faSearch, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-main-person',
  standalone: false,
  templateUrl: './search-main-person.html',
  styleUrl: './search-main-person.scss',
})
export class SearchMainPerson implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  public bgImage: string = 'img/bg/search-main-bg-1.jpg';

  public searchIcon: IconDefinition = faSearch;
  public userIcon: IconDefinition = faUser;

  public placeholder: string = 'Eg. Steven Spielberg';

  public personSearchForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.personSearchForm = this.fb.group({
      personSearch: new FormControl(''),
    });
  }

  public sendPersonQuery(): void {
    const personQuery = this.personSearchForm.value['personSearch'];

    if (!personQuery || personQuery.length == 0) {
      return;
    }

    this.router.navigate(['search', 'person', personQuery]);
  }

}
