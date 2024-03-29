import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';

import { HeroesService } from '../../services/heroes.service';
import { HeroInterface } from '../../interfaces';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  public heroes            : HeroInterface[] = [];
  public heroesControl     : FormControl      = new FormControl('');
  public filteredOptions  ?: HeroInterface;

  constructor( private heroService : HeroesService ) {  }

  public onSearchhero() : void {
    this.heroService.getSuggestion(this.heroesControl.value, 0).subscribe({
      next: (response : HeroInterface[]) =>  {
        this.heroes = response;
      },
      error: (error) => {
        this.heroes = [];
      }}
    );
  }

  public onSeletedOption(event : MatOptionSelectionChange) : void {
    if (!event.source.value) {
      this.filteredOptions = undefined;
      return;
    }

    if(!event.isUserInput) {
      return;
    }

    const hero : HeroInterface = event.source.value;
    this.heroesControl.setValue(hero.superhero);
    this.filteredOptions = hero;
    this.heroes = [hero];
  }
}
