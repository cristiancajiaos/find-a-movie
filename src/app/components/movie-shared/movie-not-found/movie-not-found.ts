import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { TitleService } from '../../../services/title-service';
import { faFilm, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-not-found',
  standalone: false,
  templateUrl: './movie-not-found.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movie-not-found.scss'
})
export class MovieNotFound implements OnInit {

  private titleService = inject(TitleService);

  public filmIcon: IconDefinition = faFilm;
  public timesIcon: IconDefinition = faTimes;

  public notFoundTitleText: string = 'Movie Not Found';
  public paragraphText: string = 'No movie was found with this ID. Try another one.';

  ngOnInit(): void {
    this.titleService.setTitle('Movie Not Found');
  }
}
