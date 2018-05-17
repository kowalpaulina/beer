import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BeerService } from '../services/beer.service';
import 'rxjs/Rx';
import { Subject, Observable } from 'rxjs';
import { Beer } from '../models/beer.interface';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BeerDetailsComponent implements OnInit {
  public beer: Beer;
  public foods: string[];

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private beerService: BeerService
  ) {}

  ngOnInit() {
    this.getBeerDetails();
  }

  /**
   * Function gets chosen beer from service
   * @return {undefined}
   */
  public getBeerDetails(): void {
    this.activeRoute.params.subscribe(params => {
      let id = params['id'];
      this.beerService.getBeerStream(id).subscribe(beer => {
        if (beer) {
          this.beer = beer[0];
          this.foods = this.beer.food_pairing;
        }
      });
    });
  }

  /**
   * Function redirects to the list of beers
   * @returns {undefined}
   */
  public backToList(): void {
    this.router.navigate(['/']);
  }
}
