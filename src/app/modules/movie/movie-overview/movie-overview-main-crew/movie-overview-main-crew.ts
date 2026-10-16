import {
  Component,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  input,
  InputSignal,
  signal,
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
  public direction: WritableSignal<CrewMember[]> = signal([]);
  public coDirection: WritableSignal<CrewMember[]> = signal([]);

  public allWriters: WritableSignal<CrewMember[]> = signal([]);
  public writing: WritableSignal<CrewMember[]> = signal([]);

  public teleplay: WritableSignal<CrewMember[]> = signal([]);
  public story: WritableSignal<CrewMember[]> = signal([]);
  public screenstory: WritableSignal<CrewMember[]> = signal([]);
  public basedOnPoemBy: WritableSignal<CrewMember[]> = signal([]);
  public basedOnNovelBy: WritableSignal<CrewMember[]> = signal([]);
  public basedOnStoryBy: WritableSignal<CrewMember[]> = signal([]);
  public basedOnCharactersBy: WritableSignal<CrewMember[]> = signal([]);
  public basedOnBookBy: WritableSignal<CrewMember[]> = signal([]);
  public basedOnComicBookBy: WritableSignal<CrewMember[]> = signal([]);
  public basedOnFilmWrittenBy: WritableSignal<CrewMember[]> = signal([]);
  public basedOnTVSeriesCreatedBy: WritableSignal<CrewMember[]> = signal([]);
  public basedOnTheatrePlayBy: WritableSignal<CrewMember[]> = signal([]);
  public basedOnMusicalBy: WritableSignal<CrewMember[]> = signal([]);
  public basedOnVideoGameBy: WritableSignal<CrewMember[]> = signal([]);
  public originalConceptBy: WritableSignal<CrewMember[]> = signal([]);
  public producing: WritableSignal<CrewMember[]> = signal([]);
  public executiveProducing: WritableSignal<CrewMember[]> = signal([]);
  public coExecutiveProducing: WritableSignal<CrewMember[]> = signal([]);

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
