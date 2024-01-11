import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import { HeroInterface } from '../interfaces';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  
  private baseUrl : string = environment.baseUrl

  constructor(private http : HttpClient) { }
  
  public getHeroes() : Observable<HeroInterface[]> {
      return this.http.get<HeroInterface[]>(`${this.baseUrl}/heroes`);
  }

  public getHero(id : string) : Observable<HeroInterface | undefined> {
      return this.http.get<HeroInterface>(`${this.baseUrl}/heroes/${id}`)
          .pipe(
              catchError(error => of(undefined))
          );
  }

  public getSuggestion(query : string, limit : number) : Observable<HeroInterface[]> {
      return this.http.get<HeroInterface[]>(`${this.baseUrl}/heroes?q=${query}&_limit=${limit}`);
  }

  public addHero(hero : HeroInterface) : Observable<HeroInterface> {
    const { _id, __v, ...heroInfo } = hero;
    console.log({heroInfo});
    return this.http.post<HeroInterface>(`${this.baseUrl}/heroes`, heroInfo);
  }

  public updateHero(hero : HeroInterface) : Observable<HeroInterface> {
    const { _id, __v, ...heroInfo } = hero;
      if (!hero._id) {
          throw Error('hero id is required');
      }

      console.log({hero, heroInfo})

      return this.http.patch<HeroInterface>(`${this.baseUrl}/heroes/${_id}`, heroInfo);
  }

  public deleteHero(id : string) : Observable<boolean> {
      return this.http.delete(`${this.baseUrl}/heroes/${id}`)
          .pipe(
              map(response => {return true}),
              catchError(error => {return of(false)}),
          );
  }
}
