import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faMagnifyingGlass, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-movie',
  standalone: false,
  templateUrl: './search-movie.html',
  styleUrl: './search-movie.scss'
})
export class SearchMovie implements OnInit {

  public searchIcon: IconDefinition = faMagnifyingGlass;

  public searchMovieForm: FormGroup = new FormGroup({});

  public placeholder: string = 'Eg. Star Wars';
  public ariaLabel: string = 'Search Movie';

  @ViewChild('searchMovieInput') searchMovieInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchMovieForm = this.fb.group({
      movieSearch: new FormControl('')
    });
  }

  public processMovieSearch(): void {
    this.searchMovieInput.nativeElement.blur();
    const searchQuery: string = this.searchMovieForm.value['movieSearch'];
    if (searchQuery.length == 0) {
      return;
    }
    this.router.navigate(['search', 'movie', searchQuery]);
  }

}
