import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { faTimes, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { TitleService } from '../../../services/title-service';

@Component({
  selector: 'app-person-not-found',
  standalone: false,
  templateUrl: './person-not-found.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './person-not-found.scss'
})
export class PersonNotFound implements OnInit {

  private titleService = inject(TitleService);

  public timesIcon: IconDefinition = faTimes;
  public userIcon: IconDefinition = faUser;

  public notFoundTitleText: string = 'Person Not Found';
  public paragraphText: string = 'No person was found with this ID. Try another one.';

  ngOnInit(): void {
    this.titleService.setTitle('Person Not Found');
  }
}
