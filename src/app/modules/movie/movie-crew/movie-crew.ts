import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  WritableSignal,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrewMember } from '../../../classes/credits/crew-member';
import { MovieService } from '../../../services/movie-service';
import { HttpErrorResponse } from '@angular/common/http';
import { TitleService } from '../../../services/title-service';
import { Movie } from '../../../classes/movie';
import { LoadingService } from '../../../services/loading-service';
import { SessionStorageService } from '../../../services/session-storage-service';

@Component({
  selector: 'app-movie-crew',
  standalone: false,
  templateUrl: './movie-crew.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movie-crew.scss',
})
export class MovieCrew implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private sessionStorageService = inject(SessionStorageService);
  private titleService = inject(TitleService);
  private loadingService = inject(LoadingService);

  public id: number = 0;

  private movie: Movie = null;

  public movieCrew: WritableSignal<CrewMember[]> = signal([]);

  public direction: WritableSignal<CrewMember[]> = signal([]);
  public coDirection: WritableSignal<CrewMember[]> = signal([]);
  public writing: WritableSignal<CrewMember[]> = signal([]);
  public teleplay: WritableSignal<CrewMember[]> = signal([]);
  public story: WritableSignal<CrewMember[]> = signal([]);
  public basedOnNovelBy: WritableSignal<CrewMember[]> = signal([]);
  public basedOnStoryBy: WritableSignal<CrewMember[]> = signal([]);
  public basedOnCharactersBy: WritableSignal<CrewMember[]> = signal([]);
  public basedOnBookBy: WritableSignal<CrewMember[]> = signal([]);
  public basedOnComicBookBy: WritableSignal<CrewMember[]> = signal([]);
  public basedOnFilmWrittenBy: WritableSignal<CrewMember[]> = signal([]);
  public basedOnTVSeriesCreatedBy: WritableSignal<CrewMember[]> = signal([]);
  public basedOnTheatrePlayBy: WritableSignal<CrewMember[]> = signal([]);
  public basedOnMusicalBy: WritableSignal<CrewMember[]> = signal([]);
  public producing: WritableSignal<CrewMember[]> = signal([]);
  public executiveProducing: WritableSignal<CrewMember[]> = signal([]);
  public coExecutiveProducing: WritableSignal<CrewMember[]> = signal([]);
  public associateProducing: WritableSignal<CrewMember[]> = signal([]);
  public coProducing: WritableSignal<CrewMember[]> = signal([]);
  public directorsOfPhotography: WritableSignal<CrewMember[]> = signal([]);
  public productionDesigners: WritableSignal<CrewMember[]> = signal([]);
  public editors: WritableSignal<CrewMember[]> = signal([]);
  public musicComposers: WritableSignal<CrewMember[]> = signal([]);
  public additionalMusicComposers: WritableSignal<CrewMember[]> = signal([]);
  public songsBy: WritableSignal<CrewMember[]> = signal([]);
  public lyricsBy: WritableSignal<CrewMember[]> = signal([]);
  public musicSupervisors: WritableSignal<CrewMember[]> = signal([]);
  public soundDesigners: WritableSignal<CrewMember[]> = signal([]);
  public visualEffectsSupervisors: WritableSignal<CrewMember[]> = signal([]);
  public costumeDesigners: WritableSignal<CrewMember[]> = signal([]);
  public castingCrew: WritableSignal<CrewMember[]> = signal([]);

  public crewFound: boolean = false;
  public movieCrewError: boolean = false;
  public errorMessage: string = '';

  private activatedRouteParentSubscription: Subscription = new Subscription();
  private getMovieCrewSubscription: Subscription = new Subscription();
  private endLoadingSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.getMovie();
    this.setId();
    this.endLoadingSubscription = this.loadingService.isEndLoading.subscribe((bool) => {
      if (this.movie) {
      }
    });
  }

  private getMovie(): void {
    this.movie = this.sessionStorageService.getItem('movie');
    this.setTitle();
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
      this.movie.title,
      this.movie.original_title,
      this.movie.release_date,
    );
    this.titleService.setMovieFeaturedCrewTitle(formattedTitle);
  }

  private getCrew(): void {
    this.movieCrewError = false;
    this.getMovieCrewSubscription = this.movieService.getMovieCrew(this.id).subscribe({
      next: (crew) => {
        this.movieCrew.set(crew);
        this.filterCrew();
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {},
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
    this.direction.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Director'));

    this.coDirection.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Co-Director'));

    this.writing.set(this.movieCrew().filter(
      (crewMember) => crewMember.job == 'Screenplay' || crewMember.job == 'Writer',
    ));

    this.teleplay.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Teleplay'));

    this.story.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Story'));

    this.basedOnNovelBy.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Novel'));

    this.basedOnStoryBy.set(this.movieCrew().filter(
      (crewMember) => crewMember.job == 'Original Story',
    ));

    this.basedOnCharactersBy.set(this.movieCrew().filter(
      (crewMember) => crewMember.job == 'Characters',
    ));

    this.basedOnBookBy.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Book'));

    this.basedOnComicBookBy.set(this.movieCrew().filter(
      (crewMember) => crewMember.job == 'Comic Book',
    ));

    this.basedOnFilmWrittenBy.set(this.movieCrew().filter(
      (crewMember) => crewMember.job == 'Original Film Writer',
    ));

    this.basedOnTVSeriesCreatedBy.set(this.movieCrew().filter(
      (crewMember) => crewMember.job == 'Original Series Creator',
    ));

    this.basedOnTheatrePlayBy.set(this.movieCrew().filter(
      (crewMember) => crewMember.job == 'Theatre Play',
    ));

    this.basedOnMusicalBy.set(
      this.movieCrew().filter((crewMember) => crewMember.job == 'Musical')
    );

    this.producing.set(
      this.movieCrew().filter((crewMember) => crewMember.job == 'Producer')
    );

    this.executiveProducing.set(this.movieCrew().filter(
      (crewMember) => crewMember.job == 'Executive Producer',
    ));

    this.coExecutiveProducing.set(this.movieCrew().filter(
      (crewMember) => crewMember.job == 'Co-Executive Producer',
    ));

    this.associateProducing.set(this.movieCrew().filter(
      (crewMember) => crewMember.job == 'Associate Producer',
    ));

    this.coProducing.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Co-Producer'));

    this.directorsOfPhotography.set(this.movieCrew().filter(
      (crewMember) => crewMember.job == 'Director of Photography',
    ));

    this.productionDesigners.set(this.movieCrew().filter(
      (crewMember) => crewMember.job == 'Production Design',
    ));

    this.editors.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Editor'));

    this.musicComposers.set(this.movieCrew().filter(
      (crewMember) => crewMember.job == 'Original Music Composer',
    ));

    this.additionalMusicComposers.set(this.movieCrew().filter(
      (crewMember) => crewMember.job == 'Additional Music',
    ));

    this.songsBy.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Songs'));

    this.lyricsBy.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Lyricist'));

    this.musicSupervisors.set(this.movieCrew().filter(
      (crewMember) => crewMember.job == 'Music Supervisor',
    ));

    this.soundDesigners.set(this.movieCrew().filter(
      (crewMember) => crewMember.job == 'Sound Designer',
    ));

    this.visualEffectsSupervisors.set(this.movieCrew().filter(
      (crewMember) => crewMember.job == 'Visual Effects Supervisor',
    ));

    this.costumeDesigners.set(this.movieCrew().filter(
      (crewMember) => crewMember.job == 'Costume Design',
    ));

    this.castingCrew.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Casting'));
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
