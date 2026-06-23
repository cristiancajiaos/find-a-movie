import { Component, inject, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { TitleService } from '../../../services/title-service';

@Component({
  selector: 'app-loading-fullscreen',
  standalone: false,
  templateUrl: './loading-fullscreen.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './loading-fullscreen.scss'
})
export class LoadingFullscreen implements OnInit {

  private titleService = inject(TitleService);

  public spinnerIcon: IconDefinition = faSpinner;

  public bgImage: string = 'img/bg/loading-bg.jpg';

  @Input() message: string = 'Loading...';

  ngOnInit(): void {
    this.titleService.setTitle('Loading...')
  }
}
