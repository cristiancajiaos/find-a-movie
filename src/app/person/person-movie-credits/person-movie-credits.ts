import { Component, OnDestroy, OnInit } from '@angular/core';
import { Person } from '../../classes/person';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person-movie-credits',
  standalone: false,
  templateUrl: './person-movie-credits.html',
  styleUrl: './person-movie-credits.scss'
})
export class PersonMovieCredits implements OnInit, OnDestroy {

  public id: number = 0;

  public person: Person = new Person();

  public loadingPerson: boolean = false;

  public activatedRouteParentSubscription: Subscription | undefined;

  public personFound: boolean = false;
  public personMovieCreditsError: boolean = false;
  public errorMessage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setId();

  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(params => {
      this.id = parseInt(params['id']);
    });
  }

  ngOnDestroy(): void {
    if (this.activatedRouteParentSubscription) {
      this.activatedRouteParentSubscription.unsubscribe();
    }

  }

}
