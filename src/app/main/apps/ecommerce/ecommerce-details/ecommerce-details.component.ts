import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { EcommerceService } from 'app/main/apps/ecommerce/ecommerce.service';

import {MenuItem} from 'primeng/api'; 
import * as _ from 'lodash';

@Component({
  selector: 'app-ecommerce-details',
  templateUrl: './ecommerce-details.component.html',
  styleUrls: ['./ecommerce-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceDetailsComponent implements OnInit {
  // public
  public contentHeader: object;
  public product;
  public wishlist;
  public cartList;
  public relatedProducts;

  images 
    // {
    //     "previewImageSrc": "/assets/images/pages/eCommerce/1000.jpg",
    //     "thumbnailImageSrc": "/assets/images/pages/eCommerce/1000.jpg",
    //     "alt": "Description for Image 1",
    //     "title": "Title 1"
    // },
    // {
    //     "previewImageSrc": "/assets/images/pages/eCommerce/1001.jpg",
    //     "thumbnailImageSrc": "/assets/images/pages/eCommerce/1001.jpg",
    //     "alt": "Description for Image 2",
    //     "title": "Title 2"
    // },
    // {
    //     "previewImageSrc": "/assets/images/pages/eCommerce/1002.jpg",
    //     "thumbnailImageSrc": "/assets/images/pages/eCommerce/1002.jpg",
    //     "alt": "Description for Image 3",
    //     "title": "Title 3"
    // },
    // {
    //     "previewImageSrc": "/assets/images/pages/eCommerce/1003.jpg",
    //     "thumbnailImageSrc": "/assets/images/pages/eCommerce/1003.jpg",
    //     "alt": "Description for Image 4",
    //     "title": "Title 4"
    // },
    // {
    //     "previewImageSrc": "/assets/images/pages/eCommerce/1004.png",
    //     "thumbnailImageSrc": "/assets/images/pages/eCommerce/1004.png",
    //     "alt": "Description for Image 5",
    //     "title": "Title 5"
    // },
    


    responsiveOptions:any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

  // Swiper
  public swiperResponsive: SwiperConfigInterface = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 40
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      }
    }
  };

  /**
   * Constructor
   *
   * @param {EcommerceService} _ecommerceService
   */
  constructor(private _ecommerceService: EcommerceService) {}

  chosenProductType;
  onChangeProductType(productType: any){
    this.chosenProductType = productType;
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

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

  /**
   * Add To Cart
   *
   * @param product
   */
  addToCart(productId, colorId, productTypeId) {
    this._ecommerceService.addToCart(productId, colorId, productTypeId);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  public specificationList = [];
  ngOnInit(): void {
    // Subscribe to Selected Product change
    const productId = +localStorage.getItem("productId");
    this._ecommerceService.getProductDetail(productId).subscribe(res => {
      this.product = res;
      this.chosenProductType = this.product.productTypes[0];
      this.getColorFromImgList(this.product.images);


      debugger;
      let a = res.specificationTypeDTOs.map(s => s.specificationList);
      a.forEach(element => {
        this.specificationList = [ ...this.specificationList, ...element];
      });
  
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa", this.product);
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa", this.specificationList)
    })

    // Subscribe to Wishlist change
    this._ecommerceService.onWishlistChange.subscribe(res => (this.wishlist = res));

    // Subscribe to Cartlist change
    this._ecommerceService.onCartListChange.subscribe(res => (this.cartList = res));

    // Get Related Products
    this._ecommerceService.getRelatedProducts().then(response => {
      this.relatedProducts = response;
    });

    // content header
    this.contentHeader = {
      headerTitle: 'Thông tin sản phẩm',
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
            name: 'Thông tin sản phẩm',
            isLink: true,
            link: '/'
          }
        ]
      }
    };
  }

  colorList;
  getColorFromImgList(imgList){
    let tempColorArray = imgList.map(e => e.color);
    this.colorList = _.uniqWith(tempColorArray, _.isEqual);
    this.changeBgColor(this.colorList[0]);
  }

  chosenColor;
  changeBgColor(chosenColor){
    this.chosenColor = chosenColor;
    let imgList = this.product.images.filter(e => e.color.id == chosenColor.id);
    this.images = imgList.map(e => {
      return {
        "previewImageSrc": e.imgPath,
        "thumbnailImageSrc": e.imgPath,
        "alt": "Error",
        "title": e.name
      }
    })
    console.log("convertedImgList", this.images)
  }


}
