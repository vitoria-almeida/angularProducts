 import { Injectable } from "@angular/core";
 import { IProducts } from "./products";
 import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

 @Injectable({
     providedIn: 'root'
 })

 export class ProductsService {
     private productUrl = 'api/products/products.json'

     constructor(private http: HttpClient) {}

     getProducts(): Observable<IProducts[]> {
         return this.http.get<IProducts[]>(this.productUrl).pipe(
             tap(data => console.log('All: ', JSON.stringify(data))),
             catchError(this.handleError)
         );
     }

    // Get one product
    // Since we are working with a json file, we can only retrieve all products
    // So retrieve all products and then find the one we want using 'map
     getProduct(id: number): Observable<IProducts | undefined> {
        return this.getProducts()
          .pipe(
            map((products: IProducts[]) => products.find(p => p.productId === id))
          );
      }

     private handleError(err: HttpErrorResponse){
         //em uma aplicação real, podemos enviar o servidor para alguma infraestrutura de registro remota, ao invés de só registrar no console com o console.log
         let errorMessage = '';
         if (err.error instanceof ErrorEvent) {
             //Um erro client-side ou erro de rede ocorreu, lide com isso da forma adequada.
             errorMessage = `An error occurred: ${err.error.message}`;
         } else {
             //O servidor backend retornou um código de resposta malsucedida. O corpo da resposta deve conter pistas do que deu errado.
             errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
         }
         console.log(errorMessage);
         return throwError(errorMessage)
     }  
 }

    