import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TitleService } from '../../../services/title-service';

@Component({
  selector: 'app-search-main',
  standalone: false,
  templateUrl: './search-main.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-main.scss',
})
export class SearchMain implements OnInit {

  private titleService = inject(TitleService);

  ngOnInit(): void {
    this.titleService.setTitle('What do you want to search?');
  }
}
