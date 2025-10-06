import { Component, OnInit } from '@angular/core';
import { faFilm, faSearch, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-main',
  standalone: false,
  templateUrl: './search-main.html',
  styleUrl: './search-main.scss',
})
export class SearchMain implements OnInit {
  public searchIcon: IconDefinition = faSearch;
  public movieIcon: IconDefinition = faFilm;
  public userIcon: IconDefinition = faUser;

  ngOnInit(): void {}
}
