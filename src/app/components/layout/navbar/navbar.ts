import { Component, OnInit } from '@angular/core';
import { faFilm, faUser, faBars, faMagnifyingGlass, IconDefinition, faM } from '@fortawesome/free-solid-svg-icons';

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

  ngOnInit(): void {

  }

  public toggleCollapse(): void {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  public selectSearchType(searchType: string): void {
    this.searchType = searchType;
  }
}
