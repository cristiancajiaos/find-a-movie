import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faMagnifyingGlass, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-input-movie',
  standalone: false,
  templateUrl: './search-input-movie.html',
  styleUrl: './search-input-movie.scss'
})
export class SearchInputMovie implements OnInit {

  public searchIcon: IconDefinition = faMagnifyingGlass;

  public searchMovieForm: FormGroup = new FormGroup({});

  public movies: any = [
    {id: 2501, title: 'The Bourne Identity', year: 2002, img: 'https://placehold.co/25'},
    {id: 2502, title: 'The Bourne Supremacy', year: 2004, img: 'https://placehold.co/25'},
    {id: 2503, title: 'The Bourne Ultimatum', year: 2007, img: 'https://placehold.co/25'},
    {id: 49040, title: 'The Bourne Legacy', year: 2012, img: 'https://placehold.co/25'},
    {id: 324668, title: 'Jason Bourne', year: 2016, img: 'https://placehold.co/25' }
  ];

  public placeholder: string = 'Eg. Star Wars';
  public ariaLabel: string = 'Search Movie';

  @ViewChild('searchMovieInput') searchMovieInput: ElementRef;

  @ViewChild('myDrop') myDrop: NgbDropdown;

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

  public toggleMovieSearchDropdown(): void {
    const inputMovie: string = this.searchMovieForm.controls['movieSearch'].value;
    if (inputMovie.length >= 3) {
      this.myDrop.open();
    } else {
      this.myDrop.close();
    }
  }

  public goToMovieClose(movie: any): void {
    this.myDrop.close();
  }
}
