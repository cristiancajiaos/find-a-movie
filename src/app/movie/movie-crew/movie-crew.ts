import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
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

  public direction: string[] = [];
  public writing: string [] = [];
  public basedOnWorkBy: string[] = [];
  public producing: string[] = [];
  public executiveProducing: string[] = [];
  public coProducing: string[] = [];
  public directorsOfPhotography: string[] = [];
  public productionDesigners: string[] = [];
  public editors: string[] = [];
  public musicComposers: string[] = [];
  public additionalMusicComposers: string[] = [];
  public visualEffectsSupervisors: string[] = [];
  public costumeDesigners: string[] = [];
  public castingCrew: string[] = [];

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
      this.filterCrew();
    })
    .catch(error => {

    })
    .finally(() => {
      this.loadingCrew = false;
    });
  }

  private filterCrew(): void {
    this.direction = this.movieCrew
    .filter(crewMember => crewMember.job == 'Director').map(crewMember => crewMember.name);

    this.writing = this.movieCrew
    .filter(crewMember => crewMember.job == 'Screenplay').map(crewMember => crewMember.name);

    this.basedOnWorkBy = this.movieCrew
    .filter(crewMember => crewMember.job == 'Novel').map(crewMember => crewMember.name);

    this.producing = this.movieCrew
    .filter(crewMember => crewMember.job == 'Producer').map(crewMember => crewMember.name);

    this.executiveProducing = this.movieCrew
    .filter(crewMember => crewMember.job == 'Executive Producer').map(crewMember => crewMember.name);

    this.coProducing = this.movieCrew
    .filter(crewMember => crewMember.job == 'Co-Producer').map(crewMember => crewMember.name);

    this.directorsOfPhotography = this.movieCrew
    .filter(crewMember => crewMember.job == 'Director of Photography').map(crewMember => crewMember.name);

    this.productionDesigners = this.movieCrew
    .filter(crewMember => crewMember.job == 'Production Design').map(crewMember => crewMember.name);

    this.editors = this.movieCrew
    .filter(crewMember => crewMember.job == 'Editor').map(crewMember => crewMember.name);

    this.musicComposers = this.movieCrew
    .filter(crewMember => crewMember.job == 'Original Music Composer').map(crewMember => crewMember.name);

    this.additionalMusicComposers = this.movieCrew
    .filter(crewMember => crewMember.job == 'Additional Music').map(crewMember => crewMember.name);

    this.visualEffectsSupervisors = this.movieCrew
    .filter(crewMember => crewMember.job == 'Visual Effects Supervisor').map(crewMember => crewMember.name);

    this.costumeDesigners = this.movieCrew
    .filter(crewMember => crewMember.job == 'Costume Design').map(crewMember => crewMember.name);

    this.castingCrew = this.movieCrew
    .filter(crewMember => crewMember.job == 'Casting').map(crewMember => crewMember.name);
  }

  ngOnDestroy(): void {
    this.activatedRouteParentSubscription!.unsubscribe();
  }

}
