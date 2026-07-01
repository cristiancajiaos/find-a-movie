import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TitleService } from '../../services/title-service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  private titleService = inject(TitleService);

  ngOnInit(): void {
    this.titleService.setDefaultTitle();
  }

}
