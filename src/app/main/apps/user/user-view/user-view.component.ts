import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserViewService } from 'app/main/apps/user/user-view/user-view.service';
import { EcommerceService } from '../../ecommerce/ecommerce.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import * as snippet from 'app/main/extensions/swiper/swiper.snippetcode';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserViewComponent implements OnInit {
  // public
  public url = this.router.url;
  public lastValue;
  public data;

  // private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {UserViewService} _userViewService
   */
  constructor(private router: Router, private _userViewService: UserViewService,
    private _ecommerceService: EcommerceService) {
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
    console.log("product id: ", this.lastValue)
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // this._userViewService.onUserViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //   this.data = response;
    // });
    this._ecommerceService.getProductDetail(this.lastValue).subscribe(res => {
      this.data = res;
      console.log("????", this.data);


      let groupedPeople=this.groupArrayOfObjects(res.images);

      this.groupedPeople1 = groupedPeople;
      this.groupedPeople = Object.keys(groupedPeople)
      console.log(this.groupedPeople1);
    })

    
  }
  groupedPeople;
  groupedPeople1

  groupArrayOfObjects(list) {
    return list.reduce(function(rv, x) {
      (rv[x['color']['name']] = rv[x['color']['name']] || []).push(x);
      return rv;
    }, {});
  };


}
