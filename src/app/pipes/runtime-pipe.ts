import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'runtime',
  standalone: false,
})
export class RuntimePipe implements PipeTransform {
  transform(runtime: number): string {
    const hours: number = Math.floor(runtime / 60);
    const min: number = runtime % 60;

    const hoursStr: string = hours > 0 ? `${hours}h` : '';
    const minStr: string = min > 0 ? `${min}min` : '';

    if (hours == 0 && min == 0) {
      return '';
    } else if (hours == 0 && min > 0) {
      return `${minStr}`;
    } else if (hours > 0 && min == 0) {
      return `${hoursStr}`;
    } else {
      return `${hoursStr} ${minStr}`;
    }
  }
}
