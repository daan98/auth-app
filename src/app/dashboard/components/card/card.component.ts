import { Component, Input } from '@angular/core';

import { HeroInterface } from '../../interfaces';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent {
  @Input() hero !: HeroInterface;

  ngOnInit(): void {
    if(!this.hero) {
      throw new Error('Hero properties needed');
    }
  }
}
