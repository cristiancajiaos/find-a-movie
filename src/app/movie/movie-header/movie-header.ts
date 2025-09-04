import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-header',
  standalone: false,
  templateUrl: './movie-header.html',
  styleUrl: './movie-header.scss'
})
export class MovieHeader implements OnInit {

  @Input() id: number = 0;
  public activatedRouteParentSubscription: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
  }


}
