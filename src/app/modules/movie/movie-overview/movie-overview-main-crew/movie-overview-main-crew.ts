import {
  Component,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  input,
  InputSignal,
  signal,
  computed,
} from '@angular/core';
import { CrewMember } from '../../../../classes/credits/crew-member';
import { WritableSignal } from '@angular/core';

@Component({
  selector: 'app-movie-overview-main-crew',
  standalone: false,
  templateUrl: './movie-overview-main-crew.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movie-overview-main-crew.scss',
})
export class MovieOverviewMainCrew implements OnChanges {

  public mainCrewTitle: WritableSignal<string> = signal('Main Crew');

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

  public basedOnTVSeriesCreatedText: WritableSignal<string> = signal('Based on a TV Series Created By:');
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
    return this.executiveProducing().length > 1 ? 'Executive Producers:' : 'Executive Producer:'
  });

  public coExecutiveProducing: WritableSignal<CrewMember[]> = signal([]);
  public coExecutiveProducerText = computed(() => {
    return this.coExecutiveProducing().length > 1 ? 'Co-Executive Producers:' : 'Co-Executive Producer:';
  });

  movieCrew: InputSignal<CrewMember[]> = input.required<CrewMember[]>();

  ngOnChanges(changes: SimpleChanges): void {
    this.filterMainCrew();
  }

  private filterMainCrew(): void {
    if (this.movieCrew().length > 0) {
      this.direction.set(this.movieCrew().filter((crewMember) => crewMember.job == 'Director'));

      this.coDirection.set(
        this.movieCrew().filter((crewMember) => crewMember.job == 'Co-Director'),
      );

      this.allWriters.set(
        this.movieCrew().filter(
          (crewMember) =>
            crewMember.job == 'Screenplay' ||
            crewMember.job == 'Writer' ||
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

      this.screenstory.set(
        this.movieCrew().filter((crewMember) => crewMember.job == 'Screenstory'),
      );

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

      this.basedOnMusicalBy.set(
        this.movieCrew().filter((crewMember) => crewMember.job == 'Musical'),
      );

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
    }
  }
}
