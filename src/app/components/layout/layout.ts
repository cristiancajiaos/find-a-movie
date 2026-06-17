import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading-service';
import { delay, Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout implements OnInit {

  private loadingService = inject(LoadingService);

  public loading$: Observable<boolean> = this.loadingService.isLoading;

  constructor(
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loading$ = this.loading$.pipe(
      delay(0)
    );
  }

}
