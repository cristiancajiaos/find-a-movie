import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-overview',
  standalone: false,
  templateUrl: './movie-overview.html',
  styleUrl: './movie-overview.scss'
})
export class MovieOverview implements OnInit, OnDestroy {


  public id: number = 0;

  public activatedRouteParentSubscription: Subscription | undefined;

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
    this.activatedRouteParentSubscription?.unsubscribe();
  }

}
