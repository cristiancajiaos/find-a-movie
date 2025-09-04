import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-full-crew',
  standalone: false,
  templateUrl: './movie-full-crew.html',
  styleUrl: './movie-full-crew.scss'
})
export class MovieFullCrew implements OnInit, OnDestroy {

  public id: number = 0;

  public activatedRouteParentSubscription: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.setId();
  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(params => {
      console.log(params);
      this.id = parseInt(params['id']);
    });
  }

  ngOnDestroy(): void {
    this.activatedRouteParentSubscription!.unsubscribe();
  }



}
