import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../common/product";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route
      .paramMap
      .subscribe(() => {
          this.handleProductDetails()
        }
      )
  }

  handleProductDetails(): void {
    // Check if 'id' parameter is available
    const hasProductId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasProductId){
      // @ts-ignore
      const theProductId: string = this.route.snapshot.paramMap.get('id');
      this.productService
        .getProduct(theProductId)
        .subscribe(data => {
          // console.log('product= ', JSON.stringify(data));
          this.product = data;
        });
    }
  }

}
