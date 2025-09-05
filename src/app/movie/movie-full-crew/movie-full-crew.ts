import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../../services/movie-service';
import { CrewMember } from '../../classes/crew-member';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
    this.setId();

    this.orderForm = this.fb.group({
      orderCrew: new FormControl("0")
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
    switch (this.orderForm.value['orderCrew']) {
      case '1': {
        this.movieFullCrew.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        break;
      }

      case '2': {
        this.movieFullCrew.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
        break;
      }

      case '3': {
        this.movieFullCrew.sort((a, b) => {
          return a.job.localeCompare(b.job);
        });
        break;
      }

      case '4': {
        this.movieFullCrew.sort((a, b) => {
          return b.job.localeCompare(a.job);
        });
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteParentSubscription!.unsubscribe();
  }



}
