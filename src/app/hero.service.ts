import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  heroes: Hero[] = HEROES;

  constructor(private messageService: MessageService) { }

  getHero = (id) => {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  };

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: heroes has been fetched.');
    return of(HEROES);
  }

}
