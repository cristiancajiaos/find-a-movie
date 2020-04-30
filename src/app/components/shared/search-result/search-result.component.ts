import { Component, OnInit, Input } from '@angular/core';
import { SearchResult } from 'src/app/interfaces/search-result';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  @Input() result: SearchResult;
  
  constructor() { }

  ngOnInit() {
  }

}
