import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../common/cart-item";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // General page properties
  products: Product[];
  currentCategoryId: number;
  searchMode: boolean;
  currentPageTitle: string;

  // Pagination properties
  thePageNumber: number = 1;
  thePageSize: number = 15;
  theTotalEmelents: number = 0;
  previousCategoryId: number = 1;
  previousSearchKeyword: string | null = null;

  // Injection of ProductService
  constructor(private productService: ProductService,
              private cartService: CartService,
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

    // If category changes
    if (this.previousCategoryId != this.currentCategoryId){
      this.previousCategoryId = this.currentCategoryId;
      this.thePageNumber = 1;
    }

    this.productService
      .getProductListPaginate(
        this.thePageNumber - 1, // Spring based page
        this.thePageSize,
        this.currentCategoryId)
      .subscribe(this.processPaginateResult());
  }

  handleSearchProducts() {
    const searchKeyword = this.route.snapshot.paramMap.get('keyword');

    // If search Keyword changes
    if (this.previousSearchKeyword != searchKeyword){
      this.previousSearchKeyword = searchKeyword;
      this.thePageNumber = 1;
    }

    if (searchKeyword) {
      this.currentPageTitle = 'Search: ' + searchKeyword;
      this.productService
        .searchProductsPaginate(
          this.thePageNumber - 1, // Spring based page
          this.thePageSize,
          searchKeyword)
        .subscribe(this.processPaginateResult());
    }
  }

  private processPaginateResult() {
    return (data: { _embedded: { products: Product[]; }; page: { number: number; size: number; totalElements: number; }; }) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1; // Angular based page
      this.thePageSize = data.page.size;
      this.theTotalEmelents = data.page.totalElements;
    }
  }

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  onAddToCart(tempProduct: Product) {
    // console.log("Add to cart: ",tempProduct.name, tempProduct.unit_price);
    const theCartItem: CartItem = new CartItem(tempProduct);
    this.cartService.addToCart(theCartItem);
  }

}
