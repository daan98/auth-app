import { Pipe, PipeTransform } from '@angular/core';

import { HeroInterface } from '../interfaces';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  transform(hero: HeroInterface,): string {
    if(!hero.id && !hero.alter_img || !hero.alter_img || !hero.alter_img.includes('http')) {
      return 'assets/no-image.png';
    }

    if(hero.alter_img) {
      return hero.alter_img;
    }

    return `assets/heroes/${hero.id}.jpg`;
  }

}
