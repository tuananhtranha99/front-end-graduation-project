import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Route, Router } from '@angular/router';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { EcommerceService } from 'app/main/apps/ecommerce/ecommerce.service';


@Component({
  selector: 'app-ecommerce-shop',
  templateUrl: './ecommerce-shop.component.html',
  styleUrls: ['./ecommerce-shop.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})

export class EcommerceShopComponent implements OnInit {
  // public
  public contentHeader: object;
  public shopSidebarToggle = false;
  public shopSidebarReset = false;
  public gridViewRef = true;
  public products;
  public wishlist;
  public cartList;
  public page = 1;
  public pageSize = 9;
  public searchText = '';

  /**
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {EcommerceService} _ecommerceService
   */
  constructor(private _coreSidebarService: CoreSidebarService, private _ecommerceService: EcommerceService,
    ) {}

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle Sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  /**
   * Update to List View
   */
  listView() {
    this.gridViewRef = false;
  }

  /**
   * Update to Grid View
   */
  gridView() {
    this.gridViewRef = true;
  }

  /**
   * Sort Product
   */
  sortProduct(sortParam) {
    this._ecommerceService.sortProduct(sortParam);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
      if (!localStorage.getItem('foo')) { 
        localStorage.setItem('foo', 'no reload') 
        location.reload() 
      } else {
        localStorage.removeItem('foo') 
      }
    
    // Subscribe to ProductList change

    // this._ecommerceService.onProductListChange.subscribe(res => {
    //   this.products = res;
    //   this.products.isInWishlist = false;
    // });
    this.getProductList();

    // Subscribe to Wishlist change
    // this._ecommerceService.onWishlistChange.subscribe(res => (this.wishlist = res));

    // Subscribe to Cartlist change
    // this._ecommerceService.onCartListChange.subscribe(res => (this.cartList = res));

    // update product is in Wishlist & is in CartList : Boolean
    // this.products.forEach(product => {
    //   product.isInWishlist = this.wishlist.findIndex(p => p.productId === product.id) > -1;
    //   product.isInCart = this.cartList.findIndex(p => p.productId === product.id) > -1;
    // });

    // content header
    this.contentHeader = {
      headerTitle: 'Trang chủ',
      actionButton: true,
      breadcrumb: {
        // type: '',
        // links: [
        //   {
        //     name: 'Home',
        //     isLink: true,
        //     link: '/'
        //   },
        //   {
        //     name: 'eCommerce',
        //     isLink: true,
        //     link: '/'
        //   },
        //   {
        //     name: 'Shop',
        //     isLink: false
        //   }
        // ]
      }
    };
  }

  public getProductList(){
    const params ={
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      checkedBrands: this.checkedBrands
    }
    this._ecommerceService.getProductList(params).subscribe(res => {
      this.products = res.content;
      console.log("aaaaaaaaaaa", this.products)
    })
  }

  checkedBrands = [];
  public searchByCondition(data):void {
    console.log('Có nhận được data ko vậy nè ??? ', data);
    this.getMinPriceAndMaxPriceFromValue(data.checkedPriceRange);
    this.checkedBrands = data.checkedBrands;
    this.getProductList();
  }

  minPrice;
  maxPrice;
  getMinPriceAndMaxPriceFromValue(value){
    debugger;
    switch(value){
      case 0: 
        this.minPrice = null;
        this.maxPrice = null;
        break;
      case 1:
        this.minPrice = null;
        this.maxPrice = 5000000; 
        break; 
      case 2:
        this.minPrice = 5000000;
        this.maxPrice = 10000000; 
        break; 
      case 3:
        this.minPrice = 10000000;
        this.maxPrice = 15000000; 
        break; 
      case 4:
        this.minPrice = 15000000;
        this.maxPrice = 20000000; 
        break; 
      case 5:
        this.minPrice = 20000000;
        this.maxPrice = null; 
        break; 
    }
  }

 
}
