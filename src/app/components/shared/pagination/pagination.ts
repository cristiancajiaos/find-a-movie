import { Component, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {

  pageChange: OutputEmitterRef<number> = output<number>();

  public changePage(page: number) {
    this.pageChange.emit(page);
  }

}
