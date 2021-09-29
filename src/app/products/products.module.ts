import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list.component';
import { ProductDetailsComponent } from './product-details.component';
import { MyFirstCustomPipe } from '../shared/my-first-custom-pipe';
import { StarComponent } from '../shared/star.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductDetailsGuard } from './product-details.guard';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductDetailsComponent,
    MyFirstCustomPipe,
    StarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild ([
      { path: 'products', component: ProductsListComponent },
      { path: 'products/:id', canActivate: [ProductDetailsGuard], component: ProductDetailsComponent },
    ])
  ]
})
export class ProductsModule { }
