import { Component, OnInit } from '@angular/core';
import { faLongArrowAltLeft, faGlobe, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faImdb } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  faLongArrowAltLeft: IconDefinition;
  faGlobe: IconDefinition;
  faClock: IconDefinition;
  faImdb: IconDefinition;
  searchInput: string;

  constructor() { }

  ngOnInit() {
    this.faLongArrowAltLeft = faLongArrowAltLeft;
    this.faGlobe = faGlobe;
    this.faClock = faClock;
    this.faImdb = faImdb;
  }
}
