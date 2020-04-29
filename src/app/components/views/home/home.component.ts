import { Component, OnInit } from '@angular/core';
import { faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faSearch: IconDefinition;
  searchInput: string;

  constructor() { }

  ngOnInit() {
    this.faSearch = faSearch;
    this.searchInput = '';
  }

  changeInput(str) {
    this.searchInput = str;
  }
}
