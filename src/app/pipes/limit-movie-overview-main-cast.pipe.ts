import { Pipe, type PipeTransform } from '@angular/core';
import { CastMember } from '../classes/credits/cast-member';

@Pipe({
  name: 'limitMovieOverviewMainCast',
  standalone: false
})
export class LimitMovieOverviewMainCastPipe implements PipeTransform {
  transform(cast: CastMember[]): CastMember[] {
    return cast.slice(0,7);
  }
}
