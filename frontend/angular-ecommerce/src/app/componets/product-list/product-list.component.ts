import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;
  currentPageTitle: string;
  searchMode: boolean;

  // Injection of ProductService
  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route
      .paramMap
      .subscribe( () => {
        this.listProducts()
      }
    )
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode){
      this.handleSearchProducts()
    }else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
    // Check if 'id' parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    // Check if 'name' parameter is available
    const hasCurrentCategoryName: boolean = this.route.snapshot.paramMap.has('name');
    if (hasCategoryId && hasCurrentCategoryName) {
      const categoryId = this.route.snapshot.paramMap.get('id');
      if(categoryId){
        const categoryName = this.route.snapshot.paramMap.get('name');
        this.currentPageTitle = 'Category: ' + categoryName;
        this.currentCategoryId = parseInt(categoryId);
      }
    } else {
      this.currentPageTitle = 'Category: Books';
      this.currentCategoryId = 1;
    }

    this.productService
      .getProductList(this.currentCategoryId)
      .subscribe(data => {
        // console.log('ProductS= ', JSON.stringify(data));
        this.products = data;
      });
  }

  handleSearchProducts() {
    const searchKeyword = this.route.snapshot.paramMap.get('keyword');
    if (searchKeyword) {
      this.currentPageTitle = 'Search: ' + searchKeyword;
      this.productService
        .searchProducts(searchKeyword)
        .subscribe(data => {
          // console.log('ProductS= ', JSON.stringify(data));
          this.products = data;
        });
    }
  }

}
