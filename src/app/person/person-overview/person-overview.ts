import { Component, OnDestroy, OnInit } from '@angular/core';
import { Person } from '../../classes/person';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-person-overview',
  standalone: false,
  templateUrl: './person-overview.html',
  styleUrl: './person-overview.scss'
})
export class PersonOverview implements OnInit, OnDestroy {

  public id: number = 0;

  public person: Person = new Person();

  public activatedRouteParentSubscription: Subscription | undefined;

  public personFound: boolean = false;
  public personOverviewError: boolean = false;
  public errorMessage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute
  ) {

  }


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
