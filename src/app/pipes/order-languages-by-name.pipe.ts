import { Pipe, PipeTransform } from '@angular/core';
import { SpokenLanguage } from '../classes/movie/spoken-language';

@Pipe({
  name: 'orderLanguagesByName',
  standalone: false
})
export class OrderLanguagesByNamePipe implements PipeTransform {

  transform(languages: SpokenLanguage[]): SpokenLanguage[] {
    languages.sort((a, b) => {
      const languageA: string = a.english_name;
      const languageB: string = b.english_name;
      return languageA.localeCompare(languageB);
    });
    return languages;
  }

}
