import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { UserListService } from 'app/main/apps/user/user-list/user-list.service';
import { EcommerceService } from '../../ecommerce/ecommerce.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {
  // Public
  public sidebarToggleRef = false;
  public rows;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp = [];
  public previousRoleFilter = '';
  public previousPlanFilter = '';
  public previousStatusFilter = '';

  public selectedRole = [];
  public selectedPlan = [];
  public selectedStatus = [];
  public searchValue = '';

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {UserListService} _userListService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
    private _userListService: UserListService,
    private _coreSidebarService: CoreSidebarService,
    private _coreConfigService: CoreConfigService,
    private _ecommerceService: EcommerceService,
    private _router: Router,
    private toastr: ToastrService
  ) {
    this._unsubscribeAll = new Subject();
  }



  /**
   * Toggle the sidebar
   *
   * @param name
   */
  goToAddProductPage(): void {
    this._router.navigate(["apps/user/product-add"])
  }

  deleteProduct(id){
    Swal.fire({
      title: "Xác nhận xoá",
      text: "Bạn có chắc chắn muốn xoá không",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2666de",
      cancelButtonColor: "#E42728",
      confirmButtonText: "Xoá",
      cancelButtonText: "Huỷ",
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-secondary ml-1",
      },
    }).then((result) => {
      if (result.value) {
        this._ecommerceService.deleteProduct(id).subscribe(_ => {
          if(_.statusCode == 200){
            this.getProductList();
            this.toastrSuccess('Xóa đơn hàng thành công');
          }
        })
      }
    });
    
  }

  toastrSuccess(content) {

    this.toastr.success(content, 'Thành công' , {
      closeButton: true,
      tapToDismiss: false,
      progressBar: true,
      toastClass: 'toast ngx-toastr'
    });
  }


  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe config change
    // this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
    //   ! If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
    //   if (config.layout.animation === 'zoomIn') {
    //     setTimeout(() => {
    //       this._userListService.onUserListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //         this.rows = response;
    //         this.tempData = this.rows;
    //       });
    //     }, 450);
    //   } else {
    //     this._userListService.onUserListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //       this.rows = response;
    //       this.tempData = this.rows;
    //     });
    //   }
    // });
    this.getProductList();
  }

  getProductList(){
    this._ecommerceService.getProductList({}).subscribe(res => {
      if(res.statusCode == 200) this.rows = res.content;
    })
  }
}
