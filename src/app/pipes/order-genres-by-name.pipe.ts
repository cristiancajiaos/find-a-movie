import { Pipe, PipeTransform } from '@angular/core';
import { Genre } from '../classes/movie/genre';

@Pipe({
  name: 'orderGenresByName',
  standalone: false
})
export class OrderGenresByNamePipe implements PipeTransform {

  transform(genres: Genre[]): Genre[] {
    genres.sort((a, b) => {
      return a.name.localeCompare(b.name)
    });
    return genres;
  }

}
