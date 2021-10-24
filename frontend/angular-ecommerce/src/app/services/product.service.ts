import { Injectable } from '@angular/core';
import {HttpClient } from "@angular/common/http";
import {Product} from "../common/product";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ProductCategory} from "../common/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'http://localhost:8080/api/products';
  private productByCategoryIdUrl = this.productUrl + '/search/findByCategoryId?id=';
  private searchProductByNameUrl = this.productUrl + '/search/findByNameContaining?name=';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) {
  }

  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchByCategoryIdUrl = this.productByCategoryIdUrl + theCategoryId;
    return this.getProducts(searchByCategoryIdUrl);
  }

  searchProducts(searchKeyword: string): Observable<Product[]> {
    const searchProductByName = this.searchProductByNameUrl + searchKeyword;
    return this.getProducts(searchProductByName);
  }

  getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProduct(theProductId: string): Observable<Product> {
    const getProductUrl = this.productUrl + '/' + theProductId;
    return this.httpClient.get<Product>(getProductUrl);
  }

  getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResponseProductsPage> {
    const searchByCategoryIdUrlPage =
      this.productByCategoryIdUrl + theCategoryId + "&page=" + thePage  + "&size=" + thePageSize;
    return this.httpClient.get<GetResponseProductsPage>(searchByCategoryIdUrlPage);
  }

  searchProductsPaginate(thePage: number, thePageSize: number, searchKeyword: string): Observable<GetResponseProductsPage> {
    const searchProductByNamePage = this.searchProductByNameUrl + searchKeyword + "&page=" + thePage  + "&size=" + thePageSize;
    return this.httpClient.get<GetResponseProductsPage>(searchProductByNamePage);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

}

interface GetResponseProducts {
  _embedded:{
    products: Product[] ;
  }
}

interface GetResponseProductsPage {
  _embedded:{
    products: Product[] ;
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded:{
    productCategory: ProductCategory[] ;
  }
}
