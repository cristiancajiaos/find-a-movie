import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  WritableSignal,
  signal,
  computed,
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
import { compileFunction } from 'node:vm';

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

  public id: WritableSignal<number> = signal(0);

  private movie: WritableSignal<Movie> = signal(null);

  public featuredCrewTitle: WritableSignal<string> = signal('Featured Crew');

  public movieCrew: WritableSignal<CrewMember[]> = signal([]);

  public directionText: WritableSignal<string> = signal('Directed By:');
  public direction: WritableSignal<CrewMember[]> = signal([]);

  public coDirectionText: WritableSignal<string> = signal('Co-Directed By:');
  public coDirection: WritableSignal<CrewMember[]> = signal([]);

  public writingText: WritableSignal<string> = signal('Written By:');
  public allWriters: WritableSignal<CrewMember[]> = signal([]);
  public writing: WritableSignal<CrewMember[]> = signal([]);

  public teleplayText: WritableSignal<string> = signal('Teleplay By:');
  public teleplay: WritableSignal<CrewMember[]> = signal([]);

  public storyText: WritableSignal<string> = signal('Story By:');
  public story: WritableSignal<CrewMember[]> = signal([]);

  public screenstoryText: WritableSignal<string> = signal('Screenstory By:');
  public screenstory: WritableSignal<CrewMember[]> = signal([]);

  public basedOnPoemText: WritableSignal<string> = signal('Based on a Poem By:');
  public basedOnPoemBy: WritableSignal<CrewMember[]> = signal([]);

  public basedOnNovelText: WritableSignal<string> = signal('Based on a Novel By:');
  public basedOnNovelBy: WritableSignal<CrewMember[]> = signal([]);

  public basedOnStoryText: WritableSignal<string> = signal('Based on a Story By:');
  public basedOnStoryBy: WritableSignal<CrewMember[]> = signal([]);

  public basedOnCharacterText: WritableSignal<string> = signal('Based on Characters Created By:');
  public basedOnCharactersBy: WritableSignal<CrewMember[]> = signal([]);

  public basedOnBookText: WritableSignal<string> = signal('Based on a Book By:');
  public basedOnBookBy: WritableSignal<CrewMember[]> = signal([]);

  public basedOnComicBookText: WritableSignal<string> = signal('Based on a Comic Book By:');
  public basedOnComicBookBy: WritableSignal<CrewMember[]> = signal([]);

  public basedOnFilmWrittenText: WritableSignal<string> = signal('Based on a Film Written By:');
  public basedOnFilmWrittenBy: WritableSignal<CrewMember[]> = signal([]);

  public basedOnTVSeriesCreatedText: WritableSignal<string> = signal(
    'Based on a TV Series Created By:',
  );
  public basedOnTVSeriesCreatedBy: WritableSignal<CrewMember[]> = signal([]);

  public basedOnTheatrePlayText: WritableSignal<string> = signal('Based on a Theatre Play By:');
  public basedOnTheatrePlayBy: WritableSignal<CrewMember[]> = signal([]);

  public basedOnMusicalText: WritableSignal<string> = signal('Based on a Musical By:');
  public basedOnMusicalBy: WritableSignal<CrewMember[]> = signal([]);

  public basedOnVideoGameText: WritableSignal<string> = signal('Based on a Video Game By:');
  public basedOnVideoGameBy: WritableSignal<CrewMember[]> = signal([]);

  public originalConceptText: WritableSignal<string> = signal('Original Concept By:');
  public originalConceptBy: WritableSignal<CrewMember[]> = signal([]);

  public producingText: WritableSignal<string> = signal('Produced By:');
  public producing: WritableSignal<CrewMember[]> = signal([]);

  public executiveProducing: WritableSignal<CrewMember[]> = signal([]);
  public executiveProducerText = computed(() => {
    return this.executiveProducing().length > 1 ? 'Executive Producers:' : 'Executive Producer:';
  });

  public coExecutiveProducing: WritableSignal<CrewMember[]> = signal([]);
  public coExecutiveProducerText = computed(() => {
    return this.coExecutiveProducing().length > 1
      ? 'Co-Executive Producers:'
      : 'Co-Executive Producer:';
  });

  public associateProducing: WritableSignal<CrewMember[]> = signal([]);
  public associateProducerText = computed(() => {
    return this.associateProducing().length > 1 ? 'Associate Producers:' : 'Associate Producer:';
  });

  public coProducing: WritableSignal<CrewMember[]> = signal([]);
  public coProducerText = computed(() => {
    return this.coProducing().length > 1 ? 'Co-Producers:' : 'Co-Producer:';
  });

  public directorsOfPhotography: WritableSignal<CrewMember[]> = signal([]);
  public directorOfPhotographyText = computed(() => {
    return this.directorsOfPhotography().length > 1 ? 'Directors of Photography:' : 'Director of Photography:';
  });

  public productionDesigners: WritableSignal<CrewMember[]> = signal([]);
  public productionDesignerText = computed(() => {
    return this.productionDesigners().length > 1 ? 'Production Designers:' : 'Production Designer:';
  });

  public editors: WritableSignal<CrewMember[]> = signal([]);
  public editorText = computed(() => {
    return this.editors().length > 1 ? 'Editors:' : 'Editor:';
  });

  public musicText: WritableSignal<string> = signal('Music By:');
  public allMusicComposers: WritableSignal<CrewMember[]> = signal([]);
  public musicComposers: WritableSignal<CrewMember[]> = signal([]);

  public additionalMusicText: WritableSignal<string> = signal('Additional Music By:');
  public additionalMusicComposers: WritableSignal<CrewMember[]> = signal([]);

  public songsText: WritableSignal<string> = signal('Songs By:');
  public songsBy: WritableSignal<CrewMember[]> = signal([]);

  public lyricsText: WritableSignal<string> = signal('Lyrics By:');
  public lyricsBy: WritableSignal<CrewMember[]> = signal([]);


  public musicSupervisors: WritableSignal<CrewMember[]> = signal([]);
  public musicSupervisorText = computed(() => {
    return this.musicSupervisors().length > 1 ? 'Music Supervisors:' : 'Music Supervisor:';
  });

  public soundDesigners: WritableSignal<CrewMember[]> = signal([]);
  public soundDesignerText = computed(() => {
    return this.soundDesigners().length > 1 ? 'Sound Designers:' : 'Sound Designer:';
  });

  public visualEffectsSupervisors: WritableSignal<CrewMember[]> = signal([]);
  public visualEffectsSupervisorText = computed(() => {
    return this.visualEffectsSupervisors().length > 1 ? 'Visual Effects Supervisors:' : 'Visual Effects Supervisor:';
  });

  public costumeDesigners: WritableSignal<CrewMember[]> = signal([]);
  public costumeDesignerText = computed(() => {
    return this.costumeDesigners().length > 1 ? 'Costume Designers:' : 'Costume Designer:';
  });

  public castingText: WritableSignal<string> = signal('Casting By:');
  public castingCrew: WritableSignal<CrewMember[]> = signal([]);

  public viewFullCrewText: WritableSignal<string> = signal('View Full Crew');

  public noRecognizableCrewText: WritableSignal<string> = signal(
    'This movie has no recognizable crew',
  );

  public movieCrewError: WritableSignal<boolean> = signal(false);
  public errorMessage: WritableSignal<string> = signal('');

  private activatedRouteParentSubscription: Subscription = new Subscription();
  private getMovieCrewSubscription: Subscription = new Subscription();
  private endLoadingSubscription: Subscription = new Subscription();

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
    this.movie.set(this.sessionStorageService.getItem('movie'));
    this.setTitle();
  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(
      (params) => {
        this.id.set(parseInt(params['id']));
        this.getCrew();
      },
    );
  }

  private setTitle(): void {
    const formattedTitle: string = this.movieService.getFormattedMovieTitle(
      this.movie().title,
      this.movie().original_title,
      this.movie().release_date,
    );
    this.titleService.setMovieFeaturedCrewTitle(formattedTitle);
  }

  private getCrew(): void {
    this.movieCrewError.set(false);
    this.getMovieCrewSubscription = this.movieService.getMovieCrew(this.id()).subscribe({
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
    this.movieCrewError.set(true);
    this.errorMessage.set(error.message);
  }

  public reloadCrew(event: boolean): void {
    this.getCrew();
  }

  private filterCrew(): void {
    this.direction.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Director'));

    this.coDirection.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Co-Director'));

    this.allWriters.set(
      this.movieCrew().filter(
        (crewMember) =>
          crewMember.job == 'Writer' ||
          crewMember.job == 'Screenplay' ||
          crewMember.job == 'Script',
      ),
    );

    this.allWriters().forEach((writer) => {
      if (
        !this.writing()
          .map((writerMap) => writerMap.id)
          .find((writerFind) => writerFind == writer.id)
      ) {
        this.writing.update((writers) => {
          return [...writers, writer];
        });
      }
    });

    this.teleplay.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Teleplay'));

    this.story.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Story'));

    this.screenstory.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Screenstory'));

    this.basedOnPoemBy.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Poem'));

    this.basedOnNovelBy.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Novel'));

    this.basedOnStoryBy.set(
      this.movieCrew().filter((crewMember) => crewMember.job == 'Original Story'),
    );

    this.basedOnCharactersBy.set(
      this.movieCrew().filter((crewMember) => crewMember.job == 'Characters'),
    );

    this.basedOnBookBy.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Book'));

    this.basedOnComicBookBy.set(
      this.movieCrew().filter((crewMember) => crewMember.job == 'Comic Book'),
    );

    this.basedOnFilmWrittenBy.set(
      this.movieCrew().filter((crewMember) => crewMember.job == 'Original Film Writer'),
    );

    this.basedOnTVSeriesCreatedBy.set(
      this.movieCrew().filter((crewMember) => crewMember.job == 'Original Series Creator'),
    );

    this.basedOnTheatrePlayBy.set(
      this.movieCrew().filter((crewMember) => crewMember.job == 'Theatre Play'),
    );

    this.basedOnMusicalBy.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Musical'));

    this.basedOnVideoGameBy.set(
      this.movieCrew().filter((crewMember) => crewMember.job == 'Video Game'),
    );

    this.originalConceptBy.set(
      this.movieCrew().filter((crewMember) => crewMember.job == 'Original Concept'),
    );

    this.producing.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Producer'));

    this.executiveProducing.set(
      this.movieCrew().filter((crewMember) => crewMember.job == 'Executive Producer'),
    );

    this.coExecutiveProducing.set(
      this.movieCrew().filter((crewMember) => crewMember.job == 'Co-Executive Producer'),
    );

    this.associateProducing.set(
      this.movieCrew().filter((crewMember) => crewMember.job == 'Associate Producer'),
    );

    this.coProducing.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Co-Producer'));

    this.directorsOfPhotography.set(
      this.movieCrew().filter((crewMember) => crewMember.job == 'Director of Photography'),
    );

    this.productionDesigners.set(
      this.movieCrew().filter((crewMember) => crewMember.job == 'Production Design'),
    );

    this.editors.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Editor'));

    this.allMusicComposers.set(
      this.movieCrew().filter(
        (crewMember) => crewMember.job == 'Original Music Composer' || crewMember.job == 'Music',
      ),
    );

    this.allMusicComposers().forEach((musicComposer) => {
      if (
        !this.musicComposers()
          .map((musicMap) => musicMap.id)
          .find((musicFind) => musicFind == musicComposer.id)
      ) {
        this.musicComposers.update((musics) => {
          return [...musics, musicComposer];
        });
      }
    });

    this.additionalMusicComposers.set(
      this.movieCrew().filter((crewMember) => crewMember.job == 'Additional Music'),
    );

    this.songsBy.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Songs'));

    this.lyricsBy.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Lyricist'));

    this.musicSupervisors.set(
      this.movieCrew().filter((crewMember) => crewMember.job == 'Music Supervisor'),
    );

    this.soundDesigners.set(
      this.movieCrew().filter((crewMember) => crewMember.job == 'Sound Designer'),
    );

    this.visualEffectsSupervisors.set(
      this.movieCrew().filter((crewMember) => crewMember.job == 'Visual Effects Supervisor'),
    );

    this.costumeDesigners.set(
      this.movieCrew().filter((crewMember) => crewMember.job == 'Costume Design'),
    );

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
