import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';
import { CrewMember } from '../../classes/crew-member';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-movie-crew',
  standalone: false,
  templateUrl: './movie-crew.html',
  styleUrl: './movie-crew.scss'
})
export class MovieCrew implements OnInit, OnDestroy {

  public id: number = 0;

  public movieCrew: CrewMember[] = [];

  public loadingCrew: boolean = false;

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
      this.getCrew();
    });
  }

  private getCrew(): void {
    this.loadingCrew = true;
    this.movieService.getMovieCrew(this.id).then(crew => {
      this.movieCrew = crew;
    })
    .catch(error => {

    })
    .finally(() => {
      this.loadingCrew = false;
    });
  }

  ngOnDestroy(): void {
    this.activatedRouteParentSubscription!.unsubscribe();
  }

}
