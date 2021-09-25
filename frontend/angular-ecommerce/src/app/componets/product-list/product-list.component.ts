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

  // Injection of ProductService
  constructor(private productService: ProductService,
              private  route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe( () => {
        this.listProducts()
      }
    )
  }

  listProducts() {
    // check if 'id' parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      const categoryId = this.route.snapshot.paramMap.get('id');
      if(categoryId){
        this.currentCategoryId = parseInt(categoryId);
      }
    } else {
      this.currentCategoryId = 1;
    }
    this.productService
      .getProductList(this.currentCategoryId)
      .subscribe(data => {
        // console.log('ProductS= ', JSON.stringify(data));
        this.products = data;
      });
  }

}
