import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TitleService } from '../../services/title-service';
import { faCircleXmark, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-not-found',
  standalone: false,
  templateUrl: './not-found.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './not-found.scss'
})
export class NotFound implements OnInit{

  private titleService = inject(TitleService);

  public notFoundIcon: IconDefinition = faCircleXmark;

  public notFoundTitleText: string = 'Not Found';
  public paragraphText: string = 'Page not found';

  public bgImage: string = 'img/bg/not-found-bg.jpg';

  ngOnInit(): void {
    this.titleService.setTitle('Page not found');
  }
}
