import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faFilm, faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-main-movie',
  standalone: false,
  templateUrl: './search-main-movie.html',
  styleUrl: './search-main-movie.scss',
})
export class SearchMainMovie implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  public bgImage: string = 'img/bg/search-main-bg-2.jpg';

  public searchIcon: IconDefinition = faSearch;
  public movieIcon: IconDefinition = faFilm;

  public placeholder: string = 'Eg. Star Wars';

  public movieSearchForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.movieSearchForm = this.fb.group({
      movieSearch: new FormControl(''),
    });
  }

  public sendMovieQuery(): void {
    const movieQuery = this.movieSearchForm.value['movieSearch'];

    if (!movieQuery || movieQuery.length == 0) {
      return;
    }

    this.router.navigate(['search', 'movie', movieQuery]);
  }

}
