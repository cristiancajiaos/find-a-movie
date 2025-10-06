import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFilm, faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-movie',
  standalone: false,
  templateUrl: './search-movie.html',
  styleUrl: './search-movie.scss'
})
export class SearchMovie implements OnInit, OnDestroy {

  public searchIcon: IconDefinition = faSearch;
  public movieIcon: IconDefinition = faFilm;
  
  public searchQuery: string = '';

  private routeSubscription?: Subscription;


  constructor(
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      this.searchQuery = params['searchQuery']
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

}
