import { Component, OnInit } from '@angular/core';
import { faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faSearch: IconDefinition;
  searchInput: string;

  constructor(
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.faSearch = faSearch;
    this.searchInput = '';
  }

  changeInput(str) {
    this.searchInput = str;
  }

  searchSubmit(str) {
    console.log(str);
    this.router.navigate(['search', str]);
  }
}
