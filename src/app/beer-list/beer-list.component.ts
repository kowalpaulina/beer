import { BeerService } from '../services/beer.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Beer } from '../models/beer.interface';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss']
})
export class BeerListComponent implements OnInit {
  public beers: Beer[];
  public p: number = 1;
  public loading: boolean = false;
  public total: number = 0;
  public page: number = 1;
  public limit: number = 10;

  constructor(private BeerService: BeerService, private router: Router) {}

  ngOnInit() {
    this.getBeers();
  }

  /**
   * Function gets beers list from service
   * @return {undefined}
   */
  public getBeers(): void {
    this.loading = true;
    this.BeerService.getBeerList(this.page).subscribe(beers => {
      this.beers = beers;
      this.loading = false;
      this.total = 234;
    });
  }

  /**
   * Function redirects to chosen beer page
   * @param {object} beer
   * @return {undefined}
   */
  public showDetails(beer: Beer): void {
    this.router.navigate(['details', beer.id]);
  }

  /**
   * Function for pagination: sets the page variable and calls function getBeers;
   * @param {number} n
   * @return {undefined}
   */
  public goToPage(n: number): void {
    this.page = n;
    this.getBeers();
  }

  /**
   * Function for pagination: increases the page variable and calls function getBeers;
   * @return {undefined}
   */
  public onNext(): void {
    this.page++;
    this.getBeers();
  }

  /**
   * Function for pagination: decreases the page variable and calls function getBeers;
   * @return {undefined}
   */
  public onPrev(): void {
    this.page--;
    this.getBeers();
  }
}
