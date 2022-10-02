import { Component, Input, OnInit, ViewEncapsulation, ɵɵtrustConstantResourceUrl } from '@angular/core';

import { EcommerceService } from 'app/main/apps/ecommerce/ecommerce.service';
import * as _ from 'lodash';
import { Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ecommerce-checkout-item',
  templateUrl: './ecommerce-checkout-item.component.html',
  styleUrls: ['../ecommerce-checkout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EcommerceCheckoutItemComponent implements OnInit {
  // Input Decorator
  @Input() product;
  @Output() isReloadCart = new EventEmitter<boolean>();
  /**
   * Constructor
   *
   * @param {EcommerceService} _ecommerceService
   */
  constructor(private _ecommerceService: EcommerceService) {}

  /**
   * Remove From Cart
   *
   * @param product
   */
  removeFromCart(product) {
    Swal.fire({
      title: 'Xác nhận xóa?',
      text: "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7367F0',
      cancelButtonColor: '#E42728',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }
    }).then((result) => {
      // delete from cart if user confirmed
      if (result.value) {
        debugger;
        let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
      _.remove(productsInCart, {
      productId: product.productId,
      colorId: product.colorId,
      productTypeId: product.productTypeId
    });
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
    console.log("after delete: ", productsInCart);
    this.notifyReloadCart();
      }
    });
   
  }

  notifyReloadCart(){
    this.isReloadCart.emit(true);
  }

  /**
   * Toggle Wishlist
   *
   * @param product
   */
  toggleWishlist(product) {
    if (product.isInWishlist === true) {
      this._ecommerceService.removeFromWishlist(product.id).then(res => {
        product.isInWishlist = false;
      });
    } else {
      this._ecommerceService.addToWishlist(product.id).then(res => {
        product.isInWishlist = true;
      });
    }
  }

  quantity: number = 1;
  changeQuantity(quantity){
    this.quantity = quantity;
    console.log("Soos luowjng", this.quantity)
  }

  

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  ngOnInit(): void {}
}
