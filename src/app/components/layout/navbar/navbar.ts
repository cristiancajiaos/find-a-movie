import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faFilm, faUser, faBars, faMagnifyingGlass, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {

  public filmIcon: IconDefinition = faFilm;
  public userIcon: IconDefinition = faUser;
  public barsIcon: IconDefinition = faBars;
  public searchIcon: IconDefinition = faMagnifyingGlass;

  public isMenuCollapsed: boolean = false;
  public searchType: string = 'movie';

  public searchNavbarForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.searchNavbarForm = this.fb.group({
      movieSearch: new FormControl(''),
      personSearch: new FormControl('')
    });
  }

  public toggleCollapse(): void {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  public selectSearchType(searchType: string): void {
    this.searchType = searchType;
  }

  public processSearch(): void {
    let searchQuery: string  = '';

    if (this.searchType.includes('movie')) {
      searchQuery = this.searchNavbarForm.value['movieSearch'];
    } else if (this.searchType.includes('person')) {
      searchQuery = this.searchNavbarForm.value['personSearch'];
    }

    if (searchQuery.length == 0) {
      return;
    }

    if (this.searchType.includes('movie')) {
      this.router.navigate(['search', 'movie', searchQuery]);
    } else if (this.searchType.includes('person')) {
      this.router.navigate(['search', 'person', searchQuery])
    }
  }
}
