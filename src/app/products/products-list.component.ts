import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProducts } from "./products";
import { ProductsService } from "./products.service";

@Component({
  selector: 'pm-products',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Products List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = '';
  sub!: Subscription
  
  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter
  }
  set listFilter(value: string) {
    this._listFilter = value;
    // console.log('In setter: ', value);
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProducts[] = []
  products: IProducts[] = []

  constructor(private productsService: ProductsService) {}

  performFilter(filterBy: string): IProducts[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product1: IProducts) =>
      product1.productName.toLocaleLowerCase().includes(filterBy))
  }

  imageDisplay(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.sub = this.productsService.getProducts().subscribe({
      next: prods => {
        this.products = prods;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    })
    // this.listFilter = '' 
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ratingClickedMethod(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
}