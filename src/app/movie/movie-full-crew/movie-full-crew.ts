import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../../services/movie-service';
import { CrewMember } from '../../classes/crew-member';

@Component({
  selector: 'app-movie-full-crew',
  standalone: false,
  templateUrl: './movie-full-crew.html',
  styleUrl: './movie-full-crew.scss'
})
export class MovieFullCrew implements OnInit, OnDestroy {

  public id: number = 0;

  public movieFullCrew: CrewMember[] = [];

  public loadingFullCrew: boolean = false;

  public activatedRouteParentSubscription: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {}


  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.setId();
  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.getFullCrew();
    });
  }

  private getFullCrew(): void {
    this.loadingFullCrew = true;
    this.movieService.getMovieCrew(this.id).then(crew => {
      this.movieFullCrew = crew;
    })
    .catch(error => {

    })
    .finally(() => {
      this.loadingFullCrew = false;
    });
  }

  ngOnDestroy(): void {
    this.activatedRouteParentSubscription!.unsubscribe();
  }



}
