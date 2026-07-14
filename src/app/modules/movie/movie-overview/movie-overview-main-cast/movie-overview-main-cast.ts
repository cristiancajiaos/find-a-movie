import { Component, OnChanges, SimpleChanges, ChangeDetectionStrategy, input, InputSignal } from '@angular/core';
import { CastMember } from '../../../../classes/credits/cast-member';

@Component({
  selector: 'app-movie-overview-main-cast',
  standalone: false,
  templateUrl: './movie-overview-main-cast.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movie-overview-main-cast.scss',
})
export class MovieOverviewMainCast implements OnChanges {

  public movieMainCast: CastMember[] = [];

  movieCast: InputSignal<CastMember[]> = input.required<CastMember[]>();

  ngOnChanges(changes: SimpleChanges): void {
    this.setMainCast();
  }

  private setMainCast(): void {
    this.movieMainCast = this.movieCast().slice(0, 7);
  }
}
