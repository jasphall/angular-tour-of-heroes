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
  private readonly HTTP_OPTIONS = {
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

  getHeroes(): Observable<Hero[]> {
    return this.httpClient
      .get<Hero[]>(this.HEROES_URL)
      .pipe(
        tap(_ => this.log(`Heroes have been fetched.`)),
        catchError(this.handleError('getHeroes', []))
      );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    console.log(`Request for term: ${term}`);

    return this.httpClient
      .get<Hero[]>(`${this.HEROES_URL}?name=${term}`)
      .pipe(
        tap(heroes => this.log(`Found ${heroes.length} matching ${term}`)),
        catchError(this.handleError<Hero[]>('search heroes by id', []))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient
      .post<Hero>(this.HEROES_URL, hero, this.HTTP_OPTIONS)
      .pipe(
        tap((hero: Hero) => this.log(`Added new hero with id = ${hero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.httpClient
      .put(this.HEROES_URL, hero, this.HTTP_OPTIONS)
      .pipe(
        tap(_ => this.log(`Hero with id = ${hero.id} has been updated.`)),
        catchError(this.handleError<any>(`updateHero id = ${hero.id}`))
      );
  }

  deleteHero(hero: Hero): Observable<any> {
    const url = `${this.HEROES_URL}/${hero.id}`;
    return this.httpClient
      .delete(url, this.HTTP_OPTIONS)
      .pipe(
        tap(_ => this.log(`Hero with id = ${hero.id} has been deleted.`)),
        catchError(this.handleError<any>(`deleteHero id = ${hero.id}`))
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
