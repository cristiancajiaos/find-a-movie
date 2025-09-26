import { Component, Input, OnInit } from '@angular/core';
import { CastMember } from '../../../classes/credits/cast-member';

@Component({
  selector: 'app-movie-overview-main-cast',
  standalone: false,
  templateUrl: './movie-overview-main-cast.html',
  styleUrl: './movie-overview-main-cast.scss'
})
export class MovieOverviewMainCast implements OnInit {

  @Input() movieCast: CastMember[] = [];
  public movieMainCast: CastMember[] = [];

  ngOnInit(): void {
    this.setMainCast();
  }

  private setMainCast(): void {
    this.movieMainCast = this.movieCast.slice(0, 7);
  }
}
