import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { CoreConfigService } from '@core/services/config.service';

import { InvoiceListService } from 'app/main/apps/invoice/invoice-list/invoice-list.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep } from 'lodash';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { CustomToastrComponent } from 'app/main/extensions/toastr/custom-toastr/custom-toastr.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InvoiceListComponent implements OnInit {
  // public
  public data: any;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  // public selectStatus: any = [
  //   { name: 'All', value: '' },
  //   { name: 'Downloaded', value: 'Downloaded' },
  //   { name: 'Draft', value: 'Draft' },
  //   { name: 'Paid', value: 'Paid' },
  //   { name: 'Partial Payment', value: 'Partial Payment' },
  //   { name: 'Past Due', value: 'Past Due' },
  //   { name: 'Sent', value: 'Sent' }
  // ];

  public selectedStatus = [];
  public searchValue = '';

  // decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  public rows;
  public tempFilterData;
  public previousStatusFilter = '';

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {CalendarService} _calendarService
   * @param {InvoiceListService} _invoiceListService
   */
  constructor(private _invoiceListService: InvoiceListService, private _coreConfigService: CoreConfigService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService) {
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    // Reset ng-select on search
    // this.selectedStatus = this.selectStatus[0];

    // const val = event.target.value.toLowerCase();

    // filter our data
    // const temp = this.tempData.filter(function (d) {
    //   return d.client.name.toLowerCase().indexOf(val) !== -1 || !val;
    // });

    // update the rows
    // this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  /**
   * Filter By Roles
   *
   * @param event
   */
  // filterByStatus(event) {
  //   const filter = event ? event.value : '';
  //   this.previousStatusFilter = filter;
  //   this.tempFilterData = this.filterRows(filter);
  //   this.rows = this.tempFilterData;
  // }

  /**
   * Filter Rows
   *
   * @param statusFilter
   */
  // filterRows(statusFilter): any[] {
  //   // Reset search on select change
  //   this.searchValue = '';

  //   statusFilter = statusFilter.toLowerCase();

  //   return this.tempData.filter(row => {
  //     const isPartialNameMatch = row.invoiceStatus.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
  //     return isPartialNameMatch;
  //   });
  // }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe config change
    // this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      // If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
      // if (config.layout.animation === 'zoomIn') {
      //   setTimeout(() => {
      //     this._invoiceListService.onInvoiceListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      //       this.data = response;
      //       this.rows = this.data;
      //       this.tempData = this.rows;
      //       this.tempFilterData = this.rows;
      //     });
      //   }, 450);
      // } else {
      //   this._invoiceListService.onInvoiceListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      //     this.data = response;
      //     this.rows = this.data;
      //     this.tempData = this.rows;
      //     this.tempFilterData = this.rows;
      //   });
      // }
      if (!localStorage.getItem('foo')) { 
        localStorage.setItem('foo', 'no reload') 
        location.reload() 
      } else {
        localStorage.removeItem('foo') 
      }
      this.getOrderList();
    // });
  }

  getOrderList(){
    this._invoiceListService.getOrderList().subscribe(res => {
      if(res.statusCode == 200){
        this.rows = res.content;
        console.log("aaaaaaaaaaaaa", this.rows)
      }
    })
  }

  chosenOrderId;
  modalOpenSM(modalSM, orderId, orderStatus) {
    debugger;
    this.chosenOrderId = orderId;
    this.chosenOrderStatus = orderStatus;
    this.modalService.open(modalSM, {
      centered: true,
      size: 'sm' ,
      windowClass: 'modal modal-info'
    });
  }

  chosenOrderStatus;
  saveOrderStatus(){
    console.log("Status is changed: ", this.chosenOrderStatus);
    const params = {
      orderId: this.chosenOrderId,
      status: this.chosenOrderStatus
    }
    this._invoiceListService.updateOrderStatus(params).subscribe(res => {
      if(res.statusCode == 200){
        this.getOrderList();
        this.toastrSuccess('Thay đổi trạng thái đơn hàng thành công');
      }
    })
  }

  toastrSuccess(content) {

    this.toastr.success(content, 'Thành công' , {
      closeButton: true,
      tapToDismiss: false,
      progressBar: true,
      toastClass: 'toast ngx-toastr'
    });
  }

  deleteOrder(orderId){
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
        this._invoiceListService.deleteOrder(orderId).subscribe(res => {
          if(res['statusCode'] == 200){
            this.getOrderList();
            this.toastrSuccess('Xóa đơn hàng thành công');
          }
        });
      }
    });
    
  }
}
