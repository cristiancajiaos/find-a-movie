import { Component, inject, OnInit } from '@angular/core';
import { TitleService } from '../../../services/title-service';
import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loading',
  standalone: false,
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading implements OnInit {

  private titleService = inject(TitleService);

  public spinnerIcon: IconDefinition = faSpinner;

  public loadingMessage: string = 'Loading...';

  ngOnInit(): void {
    this.titleService.setTitle('Loading...');
  }

}
