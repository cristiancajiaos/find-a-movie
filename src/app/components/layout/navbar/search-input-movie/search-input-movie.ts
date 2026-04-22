import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faList, faMagnifyingGlass, faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';
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
  public loadingIcon: IconDefinition = faSpinner;
  public resultsIcon: IconDefinition = faList;

  public searchMovieForm: FormGroup = new FormGroup({});

  public searchError: boolean = false;
  public loadingSearchMovie: boolean = false;

  public responseSearchMovie: ResponseSearchMovie = new ResponseSearchMovie();
  public originalMovieResults: ResponseMovieResult[] = [];
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

  public toggleMovieSearchDropdownBySearch(): void {
    this.movieResults = [];
  }

  public toggleMovieSearchDropdownByInput(): void {
    const inputMovie: string = this.searchMovieForm.controls['movieSearch'].value;
    if (inputMovie.length >= 3) {
      this.searchMovie();
      this.openMovieSearchDropdown();
    } else {
      this.closeMovieSearchDropdown();
    }
  }

  public toggleMovieSearchDropdownByClick(): void {
    if (this.myDrop.isOpen && this.movieResults.length > 0) {
      this.myDrop.toggle();
    }
  }

  public openMovieSearchDropdown(): void {
    this.myDrop.open();
  }

  public closeMovieSearchDropdown(): void {
    this.myDrop.close();
  }

  public toggleMovieSearchDropdown(): void {
    this.myDrop.toggle();
  }

  public searchMovie(): void {
    const inputMovie: string = this.searchMovieForm.controls['movieSearch'].value;
    this.movieResults = [];
    this.searchError = false;
    this.loadingSearchMovie = true;
    this.searchService.searchMovieInput(inputMovie).then(responseMovieResults => {
      this.originalMovieResults = responseMovieResults;
      this.movieResults = responseMovieResults.slice(0,5);
    }).catch((error: HttpErrorResponse) => {

    }).finally(() => {
      this.loadingSearchMovie = false;
    });
  }

  public goToMovieClose(value: boolean): void {
    this.myDrop.close();
  }
}
