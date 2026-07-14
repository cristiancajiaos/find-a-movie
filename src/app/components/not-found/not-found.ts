import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TitleService } from '../../services/title-service';
import { faCircleXmark, faSitemap, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';

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
  public sitemapIcon: IconDefinition = faSitemap;
  public timesIcon: IconDefinition = faTimes;

  public notFoundTitleText: string = 'Page Not Available';
  public paragraphText: string = 'The page you are trying to access is not available in this app.';

  ngOnInit(): void {
    this.titleService.setTitle('Page Not Available');
  }
}
