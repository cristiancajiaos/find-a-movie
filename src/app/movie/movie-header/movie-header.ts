import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../classes/movie';

@Component({
  selector: 'app-movie-header',
  standalone: false,
  templateUrl: './movie-header.html',
  styleUrl: './movie-header.scss'
})
export class MovieHeader implements OnInit {

  @Input() id: number = 0;
  @Input() movie: Movie = new Movie();

  public year: number = 0;

  constructor(
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setYear();
  }

  public setYear(): void {
    const releaseYear: Date = new Date(this.movie.release_date);
    this.year = releaseYear.getFullYear();
  }


}
