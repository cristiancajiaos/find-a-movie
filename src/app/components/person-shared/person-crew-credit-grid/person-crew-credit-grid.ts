import { Component, OnInit, ChangeDetectionStrategy, inject, WritableSignal, signal, InputSignal, input } from '@angular/core';
import { ResponsePersonCrewCredit } from '../../../classes/person-movie-credits/response-person-crew-credit';
import { environment } from '../../../../environments/environment.development';
import { MovieService } from '../../../services/movie-service';

@Component({
  selector: 'app-person-crew-credit-grid',
  standalone: false,
  templateUrl: './person-crew-credit-grid.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './person-crew-credit-grid.scss'
})
export class PersonCrewCreditGrid implements OnInit {

  private movieService = inject(MovieService);

  crewRole: InputSignal<ResponsePersonCrewCredit> = input.required<ResponsePersonCrewCredit>();

  public posterSizeSmall: WritableSignal<string> = signal('');
  public formattedTitle: WritableSignal<string> = signal('');
  public altPosterText: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.setTitle();
    this.setPoster();
  }

  public setTitle(): void {
    this.formattedTitle.set(this.movieService.getFormattedMovieTitle(
      this.crewRole().title,
      this.crewRole().original_title,
      this.crewRole().release_date
    ));
  }

  public setPoster(): void {
    this.posterSizeSmall.set(this.crewRole().poster_path ? `${environment.imgUrl}${environment.posterSizeSmall}${this.crewRole().poster_path}` : 'img/default-images/movie_poster_notavailable_w500.jpg');
    this.altPosterText.set(this.crewRole().poster_path
    ? `Poster from the movie ${this.formattedTitle}`
    : `Poster from the movie ${this.formattedTitle} is not available`);
  }

}
