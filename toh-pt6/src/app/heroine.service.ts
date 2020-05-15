import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Heroine } from './heroine';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class HeroineService{

private heroinesUrl='api/heroines'; // URL to web api

httpOptions = {
headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
};


constructor(
private http: HttpClient,
private messageService: MessageService
){}


/*Get heroines*/

getHeroines (): Observable<Heroine[]> {

return this.http.get<Heroine[]>(this.heroinesUrl)
.pipe(
        tap(_ => this.log('fetched heroines')),
        catchError(this.handleError<Heroine[]>('getHeroines', []))
      );
}


/** GET heroine by id. Return `undefined` when id not found */
  getHeroineNo404<Data>(id: number): Observable<Heroine> {
    const url = `${this.heroinesUrl}/?id=${id}`;
    return this.http.get<Heroine[]>(url)
      .pipe(
        map(heroines => heroines[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} heroine id=${id}`);
        }),
        catchError(this.handleError<Heroine>(`getHeroines id=${id}`))
      );
  }


  /** GET heroine by id. Will 404 if id not found */
  getHeroine(id: number): Observable<Heroine> {
    const url = `${this.heroinesUrl}/${id}`;
    return this.http.get<Heroine>(url).pipe(
      tap(_ => this.log(`fetched heroine id=${id}`)),
      catchError(this.handleError<Heroine>(`getHeroine id=${id}`))
    );
  }


  /*GET heroines whose name contains search term */
  searchHeroines(term: string): Observable<Heroine[]> {
    if (!term.trim()) {
      // if not search term, return empty heroine array.
      return of([]);
    }
    return this.http.get<Heroine[]>(`${this.heroinesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroinesUrl matching "${term}"`) :
         this.log(`no heroines matching "${term}"`)),
      catchError(this.handleError<Heroine[]>('searchHeroines', []))
    );
  }


  /*****Save Methods*****/

  /** POST: add a new heroine to the server */
  addHeroine (heroine: Heroine): Observable<Heroine> {
    return this.http.post<Heroine>(this.heroinesUrl, heroine, this.httpOptions).pipe(
      tap((newHeroine: Heroine) => this.log(`added heroine w/ id=${newHeroine.id}`)),
      catchError(this.handleError<Heroine>('addHeroine'))
    );
  }
  
  
  /** DELETE: delete the heroine from the server */
  deleteHeroine (heroine: Heroine | number): Observable<Heroine> {
    const id = typeof heroine === 'number' ? heroine : heroine.id;
    const url = `${this.heroinesUrl}/${id}`;

    return this.http.delete<Heroine>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted heroine id=${id}`)),
      catchError(this.handleError<Heroine>('deleteHeroine'))
    );
  }
  
  
  /** PUT: update the heroine on the server */
  updateHeroine (heroine: Heroine): Observable<any> {
    return this.http.put(this.heroinesUrl, heroine, this.httpOptions).pipe(
      tap(_ => this.log(`updated heroine id=${heroine.id}`)),
      catchError(this.handleError<any>('updateHeroine'))
    );
  }
  
  
   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroineService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroineService: ${message}`);
  }
  
  
  


}
