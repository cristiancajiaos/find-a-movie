import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  standalone: false,
  templateUrl: './movie.html',
  styleUrl: './movie.scss'
})
export class Movie implements OnInit {

  public id: string = '';

  constructor(
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

}
