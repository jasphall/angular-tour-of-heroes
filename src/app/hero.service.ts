import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private readonly HEROES_URL = '/api/heroes';
  private readonly OPTIONS = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };

  constructor(private messageService: MessageService,
              private httpClient: HttpClient) { }

  getHero(id: number): Observable<Hero> {
    const url = `${this.HEROES_URL}/${id}`;
    return this.httpClient
      .get<Hero>(url)
      .pipe(
        tap(_ => this.log(`Hero with id = ${id} has been fetched.`)),
        catchError(this.handleError<Hero>(`getHero id = ${id}`))
      );
  };

  updateHero(hero: Hero): Observable<any> {
    return this.httpClient
      .put(this.HEROES_URL, hero, this.OPTIONS)
      .pipe(
        tap(_ => this.log(`Hero with id = ${hero.id} has been updated.`)),
        catchError(this.handleError<any>(`updateHero id = ${hero.id}`))
      );
  }

  getHeroes(): Observable<Hero[]> {
    return this.httpClient
      .get<Hero[]>(this.HEROES_URL)
      .pipe(
        tap(_ => this.log(`Heroes have been fetched.`)),
        catchError(this.handleError('getHeroes', []))
      );
  }

  private log = (message) => this.messageService.add(`HeroService: ${message}`);

  private handleError<T> (operation = 'operation', result? : T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`Operation ${operation} has failed: ${error.message}`);
      return of(result as T);
    };
  }

}
