import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { CrewMember } from '../../classes/credits/crew-member';
import { MovieService } from '../../services/movie-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-movie-crew',
  standalone: false,
  templateUrl: './movie-crew.html',
  styleUrl: './movie-crew.scss'
})
export class MovieCrew implements OnInit, OnDestroy {

  public id: number = 0;

  public movieCrew: CrewMember[] = [];

  public direction: CrewMember[] = [];
  public writing: CrewMember[] = [];
  public story: CrewMember[] = [];
  public basedOnWorkBy: CrewMember[] = [];
  public producing: CrewMember[] = [];
  public executiveProducing: CrewMember[] = [];
  public coProducing: CrewMember[] = [];
  public directorsOfPhotography: CrewMember[] = [];
  public productionDesigners: CrewMember[] = [];
  public editors: CrewMember[] = [];
  public musicComposers: CrewMember[] = [];
  public additionalMusicComposers: CrewMember[] = [];
  public visualEffectsSupervisors: CrewMember[] = [];
  public costumeDesigners: CrewMember[] = [];
  public castingCrew: CrewMember[] = [];

  public loadingCrew: boolean = false;

  public activatedRouteParentSubscription: Subscription | undefined;

  public crewFound: boolean = false;
  public movieCrewError: boolean = false;
  public errorMessage: string = '';

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
    this.movieCrewError = false;
    this.loadingCrew = true;
    this.movieService.getMovieCrew(this.id).then(crew => {
      this.movieCrew = crew;
      this.filterCrew();
    })
    .catch((error: HttpErrorResponse) => {
      this.handleError(error);
    })
    .finally(() => {
      this.loadingCrew = false;
    });
  }

  private handleError(error: HttpErrorResponse): void {
    this.movieCrewError = true;
    this.errorMessage = error.message;
  }

  public reloadCrew(event: boolean): void {
    this.getCrew();
  }

  private filterCrew(): void {
    this.direction = this.movieCrew
    .filter(crewMember => crewMember.job == 'Director');

    this.writing = this.movieCrew
    .filter(crewMember => crewMember.job == 'Screenplay' || crewMember.job == 'Writer');

    this.story = this.movieCrew
    .filter(crewMember => crewMember.job == 'Story');

    this.basedOnWorkBy = this.movieCrew
    .filter(crewMember => crewMember.job == 'Novel');

    this.producing = this.movieCrew
    .filter(crewMember => crewMember.job == 'Producer');

    this.executiveProducing = this.movieCrew
    .filter(crewMember => crewMember.job == 'Executive Producer');

    this.coProducing = this.movieCrew
    .filter(crewMember => crewMember.job == 'Co-Producer');

    this.directorsOfPhotography = this.movieCrew
    .filter(crewMember => crewMember.job == 'Director of Photography');

    this.productionDesigners = this.movieCrew
    .filter(crewMember => crewMember.job == 'Production Design')

    this.editors = this.movieCrew
    .filter(crewMember => crewMember.job == 'Editor');

    this.musicComposers = this.movieCrew
    .filter(crewMember => crewMember.job == 'Original Music Composer');

    this.additionalMusicComposers = this.movieCrew
    .filter(crewMember => crewMember.job == 'Additional Music');

    this.visualEffectsSupervisors = this.movieCrew
    .filter(crewMember => crewMember.job == 'Visual Effects Supervisor');

    this.costumeDesigners = this.movieCrew
    .filter(crewMember => crewMember.job == 'Costume Design');

    this.castingCrew = this.movieCrew
    .filter(crewMember => crewMember.job == 'Casting');
  }

  ngOnDestroy(): void {
    this.activatedRouteParentSubscription!.unsubscribe();
  }

}
