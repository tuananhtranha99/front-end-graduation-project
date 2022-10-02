import { Component, OnInit, ViewEncapsulation, ɵɵtrustConstantResourceUrl } from '@angular/core';

import Stepper from 'bs-stepper';

import { EcommerceService } from 'app/main/apps/ecommerce/ecommerce.service';
import * as _ from 'lodash';
import { FormBuilder, FormGroup } from '@angular/forms';
import { create } from 'domain';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastrsModule } from 'app/main/extensions/toastr/toastr.module';
import { ToastService } from 'app/main/components/toasts/toasts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ecommerce-checkout',
  templateUrl: './ecommerce-checkout.component.html',
  styleUrls: ['./ecommerce-checkout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceCheckoutComponent implements OnInit {
  // Public
  public contentHeader: object;
  public products;
  public cartLists;
  public wishlist;

  // public address = {
  //   fullNameVar: '',
  //   numberVar: '',
  //   flatVar: '',
  //   typeVar: '',
  //   noteVar: ''
  // };

  public addressForm: FormGroup;
createAddressForm(){
  this.addressForm = this.fb.group({
    fullName: '',
    phoneNumber: '',
    addressDetail: '',
    note: '',
    addressType: 0
  })
}

  private checkoutStepper: Stepper;
  constructor(private _ecommerceService: EcommerceService, private fb: FormBuilder, private toastr: ToastrService,
    private router: Router) {}

  productsInCart = JSON.parse(localStorage.getItem("productsInCart"));

  /**
   * Stepper Next
   */
  nextStep() {
    this.checkoutStepper.next();
  }
  /**
   * Stepper Previous
   */
  previousStep() {
    this.checkoutStepper.previous();
  }

  /**
   * Validate Next Step
   *
   * @param addressForm
   */
  validateNextStep(addressForm) {
    if (addressForm.valid) {
      this.nextStep();
    }
  }

  totalPrice;
  getProductListInCart(){
    this.totalPrice = 0;
    this.productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
    const productIds = this.productsInCart.map(product => product.productId);
    this._ecommerceService.findProductListInCart(productIds).subscribe(res => {
      let productListToShow = [];
      let tempList = res;
      this.productsInCart.forEach(element => {
        debugger;
        let productInCart = tempList.filter(o => o.id == element.productId)[0];
        console.log("????", productInCart)
        let img = productInCart.images.filter(o => o.color.id == element.colorId)[0];
        this.getColorFromImgList(productInCart.images);
        let color = this.colorList.filter(o => o.id == element.colorId)[0];
        let productType = productInCart.productTypes.filter(o => o.id == element.productTypeId)[0];
        productListToShow.push({
          name: productInCart.name,
          imgPath: img.imgPath,
          color: color,
          productType: productType,
          price: productType.price,
          productId: productInCart.id,
          colorId: color.id,
          productTypeId: productType.id
        })
        this.totalPrice += productType.price;
      });
      this.products = productListToShow;
      console.log("IN CART: ", this.products)
    })
  }

  colorList;
  getColorFromImgList(imgList){
    let tempColorArray = imgList.map(e => e.color);
    this.colorList = _.uniqWith(tempColorArray, _.isEqual);
  }

  createOrder(){
    const productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
    let params = {
      products: productsInCart,
      addressInfo: this.addressForm.value
    }
    console.log("params: ", params)
    this._ecommerceService.createOrder(params).subscribe(res => {
      if(res.statusCode == 200) {
        this.toastr.success('Đơn hàng đã được tạo thành công', 'Success!', {
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
        localStorage.removeItem("productsInCart")
      } else {
        this.toastr.error('Đã có lỗi khi tạo đơn hàng, vui lòng kiểm tra lại', 'Error!', {
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
      }
      
      //navigate to home page
      window.setTimeout(() => { 
        this.router.navigate(['apps/e-commerce/shop'])  
      }, 1000);
    })
  }

  refreshCart(isRefreshCart: boolean) {
    if(isRefreshCart) this.getProductListInCart();
  }
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.createAddressForm();
    this.getProductListInCart();
    // Subscribe to ProductList change
    // this._ecommerceService.onProductListChange.subscribe(res => {
    //   this.products = res;

    //   this.products.isInWishlist = false;
    // });

    // Subscribe to Cartlist change
    this._ecommerceService.onCartListChange.subscribe(res => (this.cartLists = res));

    // Subscribe to Wishlist change
    this._ecommerceService.onWishlistChange.subscribe(res => (this.wishlist = res));

    this.checkoutStepper = new Stepper(document.querySelector('#checkoutStepper'), {
      linear: false,
      animation: true
    });

    // content header
    this.contentHeader = {
      headerTitle: 'Giỏ hàng',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Trang chủ',
            isLink: true,
            link: '/'
          },
          {
            name: 'Giỏ hàng',
            isLink: true,
            link: '/'
          },
        ]
      }
    };
  }
}
