import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchViewComponent implements OnInit {
  @Input() searchInput: string;

  constructor() { }

  ngOnInit() {
    this.searchInput = '';
  }

}
