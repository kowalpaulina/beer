import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'my-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() page: number;
  @Input() count: number;
  @Input() perPage: number;
  @Input() loading: boolean;
  @Input() pagesToShow: number;

  @Output() goPrev: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() goNext: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() goPage: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  /**
   * Function calls event emitter onPage with n parameter which is a chosen page
   * @param {number} n
   * @return {undefined}
   */
  public onPage(n: number): void {
    this.goPage.emit(n);
  }

  /**
   * Function calls event emitter goPrev
   * @param {boolean}
   * @return {undefined}
   */
  public onPrev(): void {
    this.goPrev.emit(true);
  }

  /**
   * Function calls event emitter goNext
   * @param {boolean} next
   * @return {undefined}
   */
  public onNext(next: boolean): void {
    this.goNext.emit(next);
  }

  /**
   * Function returns true if result of multiplication current page by a number of beer per page is bigger than a total amount of beers 
   * @return {boolean}
   */
  public lastPage(): boolean {
    return this.perPage * this.page > this.count;
  }

  /**
   * Function returns pages to display 
   * @return {[]number} pages
   */
  public getPages(): number[] {
    const c = Math.ceil(this.count / this.perPage);
    const p = this.page || 1;
    const pagesToShow = this.pagesToShow || 9;
    const pages: number[] = [];
    pages.push(p);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < c) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
    pages.sort((a, b) => a - b);
    return pages;
  }
}
