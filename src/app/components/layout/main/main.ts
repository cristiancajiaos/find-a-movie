import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../services/title-service';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main implements OnInit {

  constructor(
    private titleService: TitleService
  ) {

  }
  ngOnInit(): void {
    this.titleService.setDefaultTitle();
  }

}
