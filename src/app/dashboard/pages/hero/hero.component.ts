import { Component, OnInit } from '@angular/core';
import { HeroInterface } from '../../interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'heroes-hero',
  templateUrl: './hero.component.html',
  styles: [
  ]
})
export class HeroComponent implements OnInit {
  public hero ?: HeroInterface;

  constructor(
    private heroesService : HeroesService,
    private activatedRoute : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.retrieveHeroInfo();
  }

  private retrieveHeroInfo() : void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHero(id))
      )
      .subscribe(
        (response : HeroInterface | undefined) => {
          if (!response) {
            return this.router.navigate(['heroes/list']);
          }
          
          return this.hero = response;
        }
      )
  }

  public goBack() : void {
    this.router.navigate(['heroes/list']);
  }
}
