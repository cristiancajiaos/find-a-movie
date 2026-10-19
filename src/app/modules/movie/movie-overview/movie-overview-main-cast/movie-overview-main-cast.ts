import { Component, OnChanges, SimpleChanges, ChangeDetectionStrategy, input, InputSignal, WritableSignal, signal } from '@angular/core';
import { CastMember } from '../../../../classes/credits/cast-member';

@Component({
  selector: 'app-movie-overview-main-cast',
  standalone: false,
  templateUrl: './movie-overview-main-cast.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movie-overview-main-cast.scss',
})
export class MovieOverviewMainCast implements OnChanges {

  public movieMainCast: WritableSignal<CastMember[]> = signal([]);

  movieCast: InputSignal<CastMember[]> = input.required<CastMember[]>();

  public mainCastTitle: WritableSignal<string> = signal('Main Cast');
  public noCastText: WritableSignal<string> = signal('This movie has no recognizable cast');
  public starringText: WritableSignal<string> = signal('Starring:');

  ngOnChanges(changes: SimpleChanges): void {
    this.setMainCast();
  }

  private setMainCast(): void {
    this.movieMainCast.set(this.movieCast().slice(0, 7));
  }
}
