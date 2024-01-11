import { Component } from '@angular/core';

import { HeroInterface } from '../../interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent {

  public heroes : HeroInterface[] = [];
  
  constructor( private heroesService : HeroesService ) {  }

  ngOnInit(): void {
    this.retireveHeros();
  }

  private retireveHeros() : void {
    this.heroesService.getHeroes().subscribe(
      (response : HeroInterface[]) => {
        this.heroes = response;
      }
    );
  }
}
