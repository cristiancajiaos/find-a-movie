import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-error',
  standalone: false,
  templateUrl: './movie-error.html',
  styleUrl: './movie-error.scss'
})
export class MovieError implements OnInit {

  @Input() errorMessage: string = '';

  ngOnInit(): void {

  }

}
