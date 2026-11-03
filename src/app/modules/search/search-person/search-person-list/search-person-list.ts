import { Component, input, InputSignal } from '@angular/core';
import { ResponsePersonResult } from '../../../../classes/response-search-person/response-person-result';

@Component({
  selector: 'app-search-person-list',
  standalone: false,
  templateUrl: './search-person-list.html',
  styleUrl: './search-person-list.scss',
})
export class SearchPersonList {

  public personResults: InputSignal<ResponsePersonResult[]> = input.required<ResponsePersonResult[]>();
  public itemsPerPage: InputSignal<number> = input.required<number>();
  public currentPage: InputSignal<number> = input.required<number>();
  public totalResults: InputSignal<number> = input.required<number>();
}
