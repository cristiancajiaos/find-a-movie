import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faSearch, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-person',
  standalone: false,
  templateUrl: './search-person.html',
  styleUrl: './search-person.scss'
})
export class SearchPerson implements OnInit, OnDestroy {

  public searchIcon: IconDefinition = faSearch;
  public userIcon: IconDefinition = faUser;
  
  public searchQuery: string = '';

  private routeSubscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      this.searchQuery = params['searchQuery'];
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

}
