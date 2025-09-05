import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../../services/movie-service';
import { CrewMember } from '../../classes/crew-member';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CastMember } from '../../classes/cast-member';

@Component({
  selector: 'app-movie-full-crew',
  standalone: false,
  templateUrl: './movie-full-crew.html',
  styleUrl: './movie-full-crew.scss'
})
export class MovieFullCrew implements OnInit, OnDestroy {

  public id: number = 0;

  public originalMovieFullCrew: CrewMember[] = [];
  public movieFullCrew: CrewMember[] = [];

  public loadingFullCrew: boolean = false;

  public activatedRouteParentSubscription: Subscription | undefined;

  public orderForm: FormGroup = new FormGroup({});

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    public fb: FormBuilder
  ) {}


  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.setId();

    this.orderForm = this.fb.group({
      order: new FormControl("1")
    });
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
      this.originalMovieFullCrew = crew;
      this.movieFullCrew = crew;
    })
    .catch(error => {

    })
    .finally(() => {
      this.loadingFullCrew = false;
    });
  }

  public changeCrewOrder(): void {
    switch (this.orderForm.value['order']) {
      case '1': {
        this.movieFullCrew.sort((a, b) => {
          const crewMemberA: CrewMember = a;
          const crewMemberB: CrewMember = b;
          return crewMemberA.name.localeCompare(crewMemberB.name);
        });
        break;
      }

      case '2': {
        this.movieFullCrew.sort((a, b) => {
          const crewMemberA: CrewMember = a;
          const crewMemberB: CrewMember = b;
          return crewMemberB.name.localeCompare(crewMemberA.name);
        });
        break;
      }

      case '3': {
        this.movieFullCrew.sort((a, b) => {
          const crewMemberA: CrewMember = a;
          const crewMemberB: CrewMember = b;
          return crewMemberA.job.localeCompare(crewMemberB.job);
        });
        break;
      }

      case '4': {
        this.movieFullCrew.sort((a, b) => {
          const crewMemberA: CrewMember = a;
          const crewMemberB: CrewMember = b;
          return crewMemberB.job.localeCompare(crewMemberA.job);
        });
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteParentSubscription!.unsubscribe();
  }



}
