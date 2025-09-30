import { Component, Input, OnInit } from '@angular/core';
import { CrewMember } from '../../../classes/credits/crew-member';

@Component({
  selector: 'app-movie-overview-main-crew',
  standalone: false,
  templateUrl: './movie-overview-main-crew.html',
  styleUrl: './movie-overview-main-crew.scss'
})
export class MovieOverviewMainCrew implements OnInit {

  @Input() movieCrew: CrewMember[] = [];

  public direction: CrewMember[] = [];
  public writing: CrewMember[] = [];
  public story: CrewMember[] = [];
  public basedOnWorkBy: CrewMember[] = [];
  public producing: CrewMember[] = [];
  public executiveProducing: CrewMember[] = [];

  ngOnInit(): void {
    this.filterMainCrew();
  }

  private filterMainCrew(): void {
    if (this.movieCrew.length > 0) {
      this.direction = this.movieCrew.filter(crewMember => crewMember.job == 'Director');

      this.writing = this.movieCrew.filter(crewMember => crewMember.job == 'Screenplay' || crewMember.job == 'Writer');

      this.story = this.movieCrew.filter(crewMember => crewMember.job == 'Story');

      this.basedOnWorkBy = this.movieCrew.filter(crewMember => crewMember.job == 'Novel');

      this.producing = this.movieCrew.filter(crewMember => crewMember.job == 'Producer');

      this.executiveProducing = this.movieCrew.filter(crewMember => crewMember.job == 'Executive Producer');
    }
  }

}
