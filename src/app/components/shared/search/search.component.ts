import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';


@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  faSearch: IconDefinition;
  @Input() searchInput: string;
  formCtrl: FormControl;
  @Output() searchInputChange = new EventEmitter();

  options: string[] = [
    'The Matrix',
    'Inception',
    'The Dark Knight',
    'The Untouchables',
    'Braveheart',
    'Spider-Man',
    'Spider-Man 2',
    'The Dark Knight Rises',
    'Iron Man',
    'Iron Man 2',
    'The Shining',
    'Ghostbusters',
    'Ghostbusters 2',
    'The Matrix Reloaded',
    'The Matrix Revolutions',
    'The Man from U.N.C.L.E',
    'Suicide Squad',
    'The Green Mile',
    'The Prestige',
    'Fargo',
    'All The President\'s Men',
    'Sector 9',
    'Hoosiers',
    'The Terminal',
    'Bull Durham',
    'Heat',
    'The Heat'
  ];
  searchOptions: string[] = [];

  constructor() {
    this.formCtrl = new FormControl();
  }

  ngOnInit() {
    this.faSearch = faSearch;
  }

  changeInput() {
    this.searchInputChange.emit(this.searchInput);
    this.filterOptions();
  }

  filterOptions() {
    this.searchOptions = this.options.filter(element => {
      return element.toLowerCase().includes(this.searchInput);
    }).sort(function (a, b) {
      const newA = a.toLowerCase().replace(/^the/, '').trim();
      const newB = b.toLowerCase().replace(/^the/, '').trim();
      return (newA > newB) ? 1 : ((newA < newB) ? -1 : 0);
    }).slice(0, 5);
  }

  fooSubmit() {
    console.log(this.searchInput);
  }
}
