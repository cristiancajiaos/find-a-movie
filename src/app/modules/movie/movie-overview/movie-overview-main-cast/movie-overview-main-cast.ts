import { Component, Input, OnChanges, OnInit, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CastMember } from '../../../../classes/credits/cast-member';

@Component({
  selector: 'app-movie-overview-main-cast',
  standalone: false,
  templateUrl: './movie-overview-main-cast.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movie-overview-main-cast.scss',
})
export class MovieOverviewMainCast implements OnChanges {

  @Input() movieCast: CastMember[] = [];
  public movieMainCast: CastMember[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.setMainCast();
  }

  private setMainCast(): void {
    this.movieMainCast = this.movieCast.slice(0, 7);
  }
}
