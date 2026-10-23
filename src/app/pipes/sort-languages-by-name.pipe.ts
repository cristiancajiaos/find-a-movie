import { Pipe, type PipeTransform } from '@angular/core';
import { SpokenLanguage } from '../classes/movie/spoken-language';

@Pipe({
  name: 'sortLanguagesByName',
  standalone: false
})
export class SortLanguagesByNamePipe implements PipeTransform {
  transform(languages: SpokenLanguage[]): SpokenLanguage[] {
      languages.sort((a, b) => {
        const languageA: string = a.english_name;
        const languageB: string = b.english_name;
        return languageA.localeCompare(languageB);
      });
      return languages;
    }
}
