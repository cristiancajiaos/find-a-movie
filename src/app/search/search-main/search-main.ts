import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faFilm, faSearch, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { TitleService } from '../../services/title-service';

@Component({
  selector: 'app-search-main',
  standalone: false,
  templateUrl: './search-main.html',
  styleUrl: './search-main.scss',
})
export class SearchMain implements OnInit {
  public searchIcon: IconDefinition = faSearch;
  public movieIcon: IconDefinition = faFilm;
  public userIcon: IconDefinition = faUser;

  public movieSearchForm: FormGroup = new FormGroup({});
  public personSearchForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Choose what do you want to search')
    this.movieSearchForm = this.fb.group({
      movieSearch: new FormControl('')
    });

    this.personSearchForm = this.fb.group({
      personSearch: new FormControl('')
    });
  }

  public sendMovieQuery(): void {
    const movieQuery = this.movieSearchForm.value['movieSearch'];

    if (!movieQuery || movieQuery.length == 0 ) {
      return;
    }

    this.router.navigate(['search', 'movie', movieQuery]);
  }

  public sendPersonQuery(): void {
    const personQuery = this.personSearchForm.value['personSearch'];

    if (!personQuery || personQuery.length == 0) {
      return;
    }

    this.router.navigate(['search', 'person', personQuery]);

  }
}
