import { Component, inject } from '@angular/core';
import { LoadingService } from '../../services/loading-service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {

  private loadingService = inject(LoadingService);

  public loading$ = this.loadingService.isLoading;

}
