import { Pipe, type PipeTransform } from '@angular/core';
import { Genre } from '../classes/movie/genre';

@Pipe({
  name: 'sortGenresByName',
  standalone: false
})
export class SortGenresByNamePipe implements PipeTransform {
  transform(genres: Genre[]): Genre[] {
      genres.sort((a, b) => {
        return a.name.localeCompare(b.name)
      });
      return genres;
    }
}
