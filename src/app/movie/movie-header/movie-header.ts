import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../classes/movie';
import { faFilm, faCircle, faCalendar, faClock, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-movie-header',
  standalone: false,
  templateUrl: './movie-header.html',
  styleUrl: './movie-header.scss'
})
export class MovieHeader implements OnInit {

  public film: IconDefinition = faFilm
  public circleSeparator: IconDefinition = faCircle;
  public calendar: IconDefinition = faCalendar;
  public clock: IconDefinition = faClock;

  @Input() id: number = 0;
  @Input() movie: Movie = new Movie();

  public year: number = 0;
  public backdropImg: string = '';

  constructor(
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setYear();
    this.setBackdrop();
  }

  public setYear(): void {
    const releaseYear: Date = new Date(this.movie.release_date);
    this.year = releaseYear.getFullYear();
  }

  public setBackdrop(): void {
    this.backdropImg = `${environment.imgUrl}${environment.backdropSize}${this.movie.backdrop_path}`;
  }
}
