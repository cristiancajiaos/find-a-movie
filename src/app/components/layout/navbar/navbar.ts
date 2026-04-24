import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
    private fb: FormBuilder
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
}
