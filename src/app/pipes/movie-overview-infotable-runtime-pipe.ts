import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieOverviewInfotableRuntime',
  standalone: false
})
export class MovieOverviewInfotableRuntimePipe implements PipeTransform {
  transform(runtime: number): string {
    return `${runtime} Min.`
  }
}
