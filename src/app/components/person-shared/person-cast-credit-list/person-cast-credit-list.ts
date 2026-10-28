import { Component, OnInit, ChangeDetectionStrategy, inject, WritableSignal, signal, InputSignal, input } from '@angular/core';
import { ResponsePersonCastCredit } from '../../../classes/person-movie-credits/response-person-cast-credit';
import { environment } from '../../../../environments/environment.development';
import { MovieService } from '../../../services/movie-service';

@Component({
  selector: 'app-person-cast-credit-list',
  standalone: false,
  templateUrl: './person-cast-credit-list.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './person-cast-credit-list.scss',
})
export class PersonCastCreditList implements OnInit {

  private movieService = inject(MovieService);

  castRole: InputSignal<ResponsePersonCastCredit> = input.required<ResponsePersonCastCredit>();

  public posterSizeSmall: WritableSignal<string> = signal('');
  public formattedTitle: WritableSignal<string> = signal('');
  public altPosterText: WritableSignal<string> = signal('');

  public uncreditedCharacterText: WritableSignal<string> = signal('as an uncredited character');
  public asText: WritableSignal<string> = signal('as');
  public roleNotDefinedText: WritableSignal<string> = signal('as a role not defined');

  ngOnInit(): void {
    this.setTitle();
    this.setPoster();
  }

  public setTitle(): void {
    this.formattedTitle.set(this.movieService.getFormattedMovieTitle(
      this.castRole().title,
      this.castRole().original_title,
      this.castRole().release_date
    ));
  }

  public setPoster(): void {
    this.posterSizeSmall.set(this.castRole().poster_path
      ? `${environment.imgUrl}${environment.posterSizeSmall}${this.castRole().poster_path}`
      : 'img/default-images/movie_poster_notavailable_w500.jpg');
    this.altPosterText.set(this.castRole().poster_path
      ? `Poster from the movie ${this.formattedTitle}`
      : `Poster from the movie ${this.formattedTitle} is not available`);
  }
}
