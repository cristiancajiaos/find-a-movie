import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrewMember } from '../../../classes/credits/crew-member';
import { MovieService } from '../../../services/movie-service';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../../services/local-storage-service';
import { TitleService } from '../../../services/title-service';
import { Movie } from '../../../classes/movie';
import { LoadingService } from '../../../services/loading-service';

@Component({
  selector: 'app-movie-crew',
  standalone: false,
  templateUrl: './movie-crew.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movie-crew.scss',
})
export class MovieCrew implements OnInit, OnDestroy {
  public id: number = 0;

  private movie: Movie = null;

  public movieCrew: CrewMember[] = [];

  public direction: CrewMember[] = [];
  public coDirection: CrewMember[] = [];
  public writing: CrewMember[] = [];
  public story: CrewMember[] = [];
  public basedOnWorkBy: CrewMember[] = [];
  public basedOnCharactersBy: CrewMember[] = [];
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

  public crewFound: boolean = false;
  public movieCrewError: boolean = false;
  public errorMessage: string = '';

  private activatedRouteParentSubscription: Subscription = new Subscription();
  private getMovieCrewSubscription: Subscription = new Subscription();
  private endLoadingSubscription: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private localStorageService: LocalStorageService,
    private titleService: TitleService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getMovie();
    this.setId();
    this.endLoadingSubscription = this.loadingService.isEndLoading.subscribe((bool) => {
      if (this.movie) {
        this.setTitle();
      }
    });
  }

  private getMovie(): void {
    this.movie = this.localStorageService.getItem('movie');
  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(
      (params) => {
        this.id = parseInt(params['id']);
        this.getCrew();
      },
    );
  }

  private setTitle(): void {
    const formattedTitle: string = this.movieService.getFormattedMovieTitle(
      this.movie.title, this.movie.original_title, this.movie.release_date
    );
    this.titleService.setMovieFeaturedCrewTitle(formattedTitle);
  }

  private getCrew(): void {
    this.movieCrewError = false;
    this.getMovieCrewSubscription = this.movieService.getMovieCrew(this.id).subscribe({
      next: (crew) => {
        this.movieCrew = crew;
        this.filterCrew();
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {
      }
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
    this.direction = this.movieCrew.filter((crewMember) => crewMember.job == 'Director');

    this.coDirection = this.movieCrew.filter((crewMember) => crewMember.job == 'Co-Director');

    this.writing = this.movieCrew.filter(
      (crewMember) => crewMember.job == 'Screenplay' || crewMember.job == 'Writer',
    );

    this.story = this.movieCrew.filter((crewMember) => crewMember.job == 'Story');

    this.basedOnWorkBy = this.movieCrew.filter((crewMember) => crewMember.job == 'Novel');

    this.basedOnCharactersBy = this.movieCrew.filter(
      (crewMember) => crewMember.job == 'Characters',
    );

    this.producing = this.movieCrew.filter((crewMember) => crewMember.job == 'Producer');

    this.executiveProducing = this.movieCrew.filter(
      (crewMember) => crewMember.job == 'Executive Producer',
    );

    this.coProducing = this.movieCrew.filter((crewMember) => crewMember.job == 'Co-Producer');

    this.directorsOfPhotography = this.movieCrew.filter(
      (crewMember) => crewMember.job == 'Director of Photography',
    );

    this.productionDesigners = this.movieCrew.filter(
      (crewMember) => crewMember.job == 'Production Design',
    );

    this.editors = this.movieCrew.filter((crewMember) => crewMember.job == 'Editor');

    this.musicComposers = this.movieCrew.filter(
      (crewMember) => crewMember.job == 'Original Music Composer',
    );

    this.additionalMusicComposers = this.movieCrew.filter(
      (crewMember) => crewMember.job == 'Additional Music',
    );

    this.visualEffectsSupervisors = this.movieCrew.filter(
      (crewMember) => crewMember.job == 'Visual Effects Supervisor',
    );

    this.costumeDesigners = this.movieCrew.filter(
      (crewMember) => crewMember.job == 'Costume Design',
    );

    this.castingCrew = this.movieCrew.filter((crewMember) => crewMember.job == 'Casting');
  }

  ngOnDestroy(): void {
    if (this.activatedRouteParentSubscription) {
      this.activatedRouteParentSubscription.unsubscribe();
    }
    if (this.getMovieCrewSubscription) {
      this.getMovieCrewSubscription.unsubscribe();
    }
    if (this.endLoadingSubscription) {
      this.endLoadingSubscription.unsubscribe();
    }
  }
}
