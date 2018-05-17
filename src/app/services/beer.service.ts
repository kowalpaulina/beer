import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Subject, Observable, Subscription } from 'rxjs';
import { Beer } from '../models/beer.interface';

@Injectable()
export class BeerService {
  constructor(private http: HttpClient) {}
  readonly beer_Api_Url: string = 'https://api.punkapi.com/v2/beers';
  public beerStream$ = new Subject<Beer>();
  public beer;
  public perPage: number = 10;

  /**
   * Function gest the list of beers from PunkApi
   * @param {number} page
   * @param {number} perPage - 
   * @returns {Observable}<Beer[]> 
   */
  public getBeerList(page:number): Observable<Beer[]> {
    return this.http.get<Beer[]>(`${this.beer_Api_Url}?page=${page}&per_page=${this.perPage}`);
  }

  /**
   * Function represents chosen/clicked by user single beer
   * @param {string} id
   * @returns {Subscription}
   */
  public getBeer(id: string): Subscription {
    return this.http.get(`${this.beer_Api_Url}/${id}`).subscribe(beer => {
      this.beer = beer;
      this.beerStream$.next(this.beer);
    });
  }

  /**
   * Function represents chosen/clicked by user single beer
   * @param {string} id
   * @returns {Observable} <Beer>
   */
  public getBeerStream(id: string): Observable<Beer> {
    this.getBeer(id);
    return Observable.from(this.beerStream$).startWith(this.beer);
  }
}
