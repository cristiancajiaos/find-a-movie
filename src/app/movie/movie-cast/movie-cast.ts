import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../../services/movie-service';
import { CastMember } from '../../classes/cast-member';

@Component({
  selector: 'app-movie-cast',
  standalone: false,
  templateUrl: './movie-cast.html',
  styleUrl: './movie-cast.scss'
})
export class MovieCast implements OnInit, OnDestroy {

  public id: number = 0;

  public movieCast: CastMember[] = [];

  public loadingCast: boolean = false;

  public activatedRouteParentSubscription: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.setId();
  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.getCast();
    });
  }

  private getCast(): void {
    this.loadingCast = true;
    this.movieService.getMovieCast(this.id).then(cast => {
      this.movieCast = cast;
    }).catch(error => {

    }).finally(() => {
      this.loadingCast = false;
    })
  }

  ngOnDestroy(): void {
    this.activatedRouteParentSubscription?.unsubscribe();
  }

}
