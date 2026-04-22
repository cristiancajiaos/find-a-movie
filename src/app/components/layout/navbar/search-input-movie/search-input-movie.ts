import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faMagnifyingGlass, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { ResponseSearchMovie } from '../../../../classes/response-search-movie';
import { ResponseMovieResult } from '../../../../classes/response-search-movie/response-movie-result';
import { SearchService } from '../../../../services/search-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-search-input-movie',
  standalone: false,
  templateUrl: './search-input-movie.html',
  styleUrl: './search-input-movie.scss'
})
export class SearchInputMovie implements OnInit {

  public searchIcon: IconDefinition = faMagnifyingGlass;

  public searchMovieForm: FormGroup = new FormGroup({});

  public searchError: boolean = false;
  public loadingSearchMovie: boolean = false;

  public responseSearchMovie: ResponseSearchMovie = new ResponseSearchMovie();
  public movieResults: ResponseMovieResult[] = [];

  public placeholder: string = 'Eg. Star Wars';
  public ariaLabel: string = 'Search Movie';

  @ViewChild('searchMovieInput') searchMovieInput: ElementRef;

  @ViewChild('myDrop') myDrop: NgbDropdown;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private searchService: SearchService
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

  public toggleMovieSearchDropdown(): void {
    const inputMovie: string = this.searchMovieForm.controls['movieSearch'].value;
    if (inputMovie.length >= 3) {
      this.searchMovie();
      this.myDrop.open();
    } else {
      this.myDrop.close();
    }
  }

  public searchMovie(): void {
    const inputMovie: string = this.searchMovieForm.controls['movieSearch'].value;
    this.movieResults = [];
    this.searchError = false;
    this.loadingSearchMovie = true;
    this.searchService.searchMovieInput(inputMovie).then(responseMovieResults => {
      this.movieResults = responseMovieResults.slice(0,5);
    }).catch((error: HttpErrorResponse) => {

    }).finally(() => {
      this.loadingSearchMovie = false;
    });
  }

  public handleMovieResults(responseSearchMovie: ResponseSearchMovie): void {
    this.movieResults = responseSearchMovie.results;
    console.log(this.movieResults);
  }

  public goToMovieClose(value: boolean): void {
    this.myDrop.close();
  }
}
