import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProducts } from './products';
import { ProductsService } from './products.service';

@Component({
  selector: 'pm-product-details',
  templateUrl: './product-details.component.html'
})

export class ProductDetailsComponent implements OnInit {
  pageTitle = 'Product Detail';
  errorMessage = '';
  product: IProducts | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductsService) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getProduct(id);
    }
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }

  backToProducts(): void {
    this.router.navigate(['/products']);
  }

}
