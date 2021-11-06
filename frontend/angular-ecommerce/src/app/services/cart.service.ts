import { Injectable } from '@angular/core';
import {CartItem} from "../common/cart-item";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem){
    // Check if we already have the item in our cart
    let theCartItemIndex = this.cartItems.findIndex((
        tempCartItem => tempCartItem.id == theCartItem.id
      ));

    // if exist update the quality else just add it.
    if (theCartItemIndex >= 0){
      this.cartItems[theCartItemIndex].quantity++;
    }else{
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQualityValue: number = 0;

    for(let currentCartIem of this.cartItems) {
      totalPriceValue += currentCartIem.unit_price * currentCartIem.quantity;
      totalQualityValue += currentCartIem.quantity;
    }
    // Publish/sent totalPrice event
    this.totalPrice.next(totalPriceValue);
    // Publish/sent totalQuantity event
    this.totalQuantity.next(totalQualityValue);

    // this.logCartData(totalPriceValue,totalQualityValue);
  }

  private logCartData(totalPriceValue: number, totalQualityValue: number) {

    console.log('Containts of the cart');
    for (let tempCartItem of this.cartItems){
      const subTotal = tempCartItem.quantity * tempCartItem.unit_price;
      console.log('name:',tempCartItem.name,
        ' quality:',tempCartItem.quantity,
        ' unitPrice:',tempCartItem.unit_price,
        ' subTotal:',subTotal);
    }
    console.log('totalPrice:',totalPriceValue.toFixed(2),
      ' totalQuality:',totalQualityValue);
    console.log('-----');
  }
}
