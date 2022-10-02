import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, NgForm } from "@angular/forms";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FlatpickrOptions } from "ng2-flatpickr";
import * as _ from "lodash";

import { UserEditService } from "app/main/apps/user/user-edit/user-edit.service";
import { EcommerceService } from "../../ecommerce/ecommerce.service";
import Swal from "sweetalert2";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class UserEditComponent implements OnInit {
  // Public
  public url = this.router.url;
  public urlLastValue;
  public rows;
  public currentRow;
  public tempRow;
  public avatarImage: string;
  public majorForm: FormGroup

  @ViewChild("accountForm") accountForm: NgForm;

  public birthDateOptions: FlatpickrOptions = {
    altInput: true,
  };

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {UserEditService} _userEditService
   */
  constructor(
    private router: Router,
    private _userEditService: UserEditService,
    private _ecommerceService: EcommerceService,
    private _fb: FormBuilder,
    public http: HttpClient,
  ) {
    this._unsubscribeAll = new Subject();
    this.urlLastValue = this.url.substr(this.url.lastIndexOf("/") + 1);
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Reset Form With Default Values
   */
  // resetFormWithDefaultValues() {
  //   this.accountForm.resetForm(this.tempRow);
  // }

  /**
   * Upload Image
   *
   * @param event
   */
  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.avatarImage = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  brandList;
  getBrandList(){
    this._ecommerceService.getBrandList().subscribe(res => {
      this.brandList = res;
    });
  }

  colorList;
  getColorList(){
    this._ecommerceService.getColorList().subscribe(res => {
      this.colorList = res;
    });
  }

  setFormValue(data){
    this.majorForm.patchValue({
      name: data.name,
      description: data.description,
      brandId: data.brand.id
    })
  }


  // @ViewChild('color') private colorElement: HTMLSelectElement;
  // oldColorId;
  // getOldColorId(event){
  //   this.oldColorId = event.target.value;
  // }

  changeColor(event, i, key){
    debugger;
    const colorId = event.target.value;
    if(Object.keys(this.groupedPeople1).filter(e => e == colorId).length > 0){
      Swal.fire({
        title: 'Không thể chọn 2 màu giống nhau',
        text: "Màu bạn chọn đã tồn tại, hãy chọn màu khác",
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonColor: '#d33',
        cancelButtonText: 'OK'
      });
      let a = document.getElementById("color"+i) as HTMLSelectElement;
      a.value = key;
      // this.colorElement.value = this.oldColorId
    } else {
      this.groupedPeople1[colorId] = this.groupedPeople1[key];
      this.groupedPeople1[colorId].forEach(e => {
        e.colorId = colorId
      });
      delete this.groupedPeople1[key];
      this.groupedPeople = Object.keys(this.groupedPeople1);
      console.log("new empire", this.groupedPeople1)
    }
  }
  /**
   * Submit
   *
   * @param form
   */
  submit() {
    let imgList = [];
    Object.keys(this.groupedPeople1).forEach(key => {
      let tempArr = this.groupedPeople1[key].map(e => ({
        name: e.name,
        imgPath: e.imgPath,
        colorId: e.colorId
      }))
      imgList.push(...tempArr);
    });

    
    const params = {
      productId: this.rows.id,
      name: this.majorForm.value.name,
      description: this.majorForm.value.description,
      brandId: this.majorForm.value.brandId,
      features: this.featuresList.map(e => e.content),
      productTypes: this.productTypeList,
      imgList: imgList
    }
    console.log("params", params);


    


    this._ecommerceService.updateProduct(params).subscribe(res => {
      Swal.fire({
        title: "Thành công",
        text: "Cập nhật sản phẩm thành công",
        icon: "success",
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: "Đóng",
        customClass: {
          cancelButton: "btn btn-secondary ml-1",
        },
      })
      this.saveUploadImages();
    })

  }

  saveUploadImages(){
    let fileList: File[] = [];
    Object.keys(this.fileListNeedtoSave).forEach(key => {
      fileList.push(...this.fileListNeedtoSave[key]);
    });

    let method = 'POST';
    let responseType: any = 'json';
    let headers: any;
    headers = new HttpHeaders({});
    headers.append('Content-Type', 'application/json');
    // const imageBlob = this.DataURIToBlob(this.croppedImage);
    // let file = new File([imageBlob], 'a', { type: "image/png" });
    const requestParam = {};
    let body = requestParam;
    const ops = {
      headers,
      body,
      responseType
    };
    const formData: FormData = new FormData();
    debugger;
    fileList.forEach(file => {
      // let file1 = new File(file);
      formData.append('fileList', file);
    })
    console.log("formData", formData)
  
    // Object.keys(params).forEach(key => formData.append(key, JSON.stringify(params[key])));
    const req = new HttpRequest(method, "http://localhost:8080/product/save-imgs", formData, ops);
    this.http.request(req).pipe().subscribe(res => {
      console.log("luu success abcde")
    });
  }

  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);
    return new Blob([ia], { type: mimeString });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  featuresList;
  productTypeList;
  ngOnInit(): void {
    this.majorForm = this._fb.group({
      name: '',
      description: '',
      brandId: ''
    });

    this.getBrandList();
    this.getColorList();

    this._ecommerceService
      .getProductDetail(+this.urlLastValue)
      .subscribe((res) => {
        // if( res.statusCode == 200){
        this.rows = res;
        this.setFormValue(this.rows);
        console.log("abcdef", this.rows);
        let groupedPeople = this.groupArrayOfObjects(res.images);

        this.featuresList = res.features;
        this.productTypeList = res.productTypes;

        this.groupedPeople1 = groupedPeople;
        this.groupedPeople = Object.keys(groupedPeople);

        //add thumbnai url to all images to show them in front end
        this.groupedPeople.forEach(key => {
          this.addThumbnailURLAndColorIdToImg(key)
        });

        //get biggest id of color to handle add more color;
        //need to do this because this.groupedPeople is an object and object key can't be accessed by index
        this.largestColorId = Object.keys(this.groupedPeople1).pop();

        // }
      });
  }
  groupedPeople;
  groupedPeople1;
  largestColorId;

  addThumbnailURLAndColorIdToImg(key){
    this.groupedPeople1[key] = this.groupedPeople1[key].map(elem => (
      {
        imgPath: elem.imgPath,
        thumbnailUrl: elem.imgPath,
        name: elem.name,
        colorId: elem.color.id
      } 
    ));
  }

  // public
  public items = [{ itemId: "", itemName: "", itemQuantity: "", itemCost: "" }];

  public item = {
    itemName: "",
    itemQuantity: "",
    itemCost: "",
  };

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Add Item
   */
  addFeature() {
    this.featuresList.push({
      content: "",
    });
  }

  addProductType() {
    this.productTypeList.push({
      name: "",
      price: "",
    });
  }

  /**
   * DeleteItem
   *
   * @param id
   */
  deleteFeature(index) {
    this.featuresList.splice(index, 1);
    console.log(this.featuresList);
  }

  deleteProductType(index) {
    this.productTypeList.splice(index, 1);
    // console.log(this.featuresList);
  }

  updateFeatures(index, event) {
    this.featuresList[index].content = event.target.value;
    console.log(this.featuresList);
  }

  updateProductTypeName(index, event) {
    this.productTypeList[index].name = event.target.value;
    // console.log(this.featuresList);
  }

  updateProductTypePrice(index, event) {
    this.productTypeList[index].price = event.target.value;
    // console.log(this.featuresList);
  }

  addColor() {
    // console.log("ID TO NHẤT, ", this.largestColorId);
    debugger;
    let idColorList = this.colorList.map(e => ''+e.id);
    let selectedIdColorList = Object.keys(this.groupedPeople1);
    const unselectedIdColorList = _.differenceWith(idColorList, selectedIdColorList, _.isEqual);
    const randomUnselectedIdColorList = unselectedIdColorList[Math.floor(Math.random() * unselectedIdColorList.length)];
    this.groupedPeople1[randomUnselectedIdColorList] = [];
    this.groupedPeople = Object.keys(this.groupedPeople1);
    console.log(this.groupedPeople1);
  }

  deleteColor(key) {
    delete this.groupedPeople1[key];
    this.groupedPeople = Object.keys(this.groupedPeople1);
    console.log(this.groupedPeople1);
  }

  //
  selectedImages: any;
  fileListNeedtoSave = {};
  urls = [];
  onSelectFile(e: any, key) {
    // if (e.target.files && e.target.files[0]) {
    //   this.selectedImages = e.target.files;
    //   const listAsArray = Array.from(this.selectedImages);
    //   for (let j = 0; j < listAsArray.length; j++) {
    //     this.fileListAsArray.push(listAsArray[j]);
    //   }
    //   console.log("this.fileListAsArray", this.fileListAsArray)

    //   for (let i = 0; i < this.selectedImages.length; i++) {
    //     var reader = new FileReader();
    //     reader.readAsDataURL(e.target.files[i]);
    //     reader.onload = (events: any) => {
    //       this.urls.push(events.target.result);
    //     }
    //   }

    // }

    if (e.target.files && e.target.files[0]) {
      this.selectedImages = e.target.files;
      const listAsArray = Array.from(this.selectedImages);
      for (let j = 0; j < listAsArray.length; j++) {
        if (!this.fileListNeedtoSave[key]) this.fileListNeedtoSave[key] = [];
        this.fileListNeedtoSave[key].push(listAsArray[j]);
      }
      console.log(this.fileListNeedtoSave);

      for (let i = 0; i < this.selectedImages.length; i++) {
        let reader = new FileReader();

        reader.onload = (event: any) => {
          this.groupedPeople1[key].push({
            thumbnailUrl: event.target.result,
            imgPath: "assets/images/pages/eCommerce/" + this.fileListNeedtoSave[key][i].name,
            name: this.fileListNeedtoSave[key][i].name,
            colorId: key
          });
        };
        reader.readAsDataURL(e.target.files[i]);
      }
    }
  }

  deleteImage(i: any, key) {
    debugger;
    let amountOfOldImages =
      this.groupedPeople1[key].length - this.fileListNeedtoSave[key].length;

    // since this.fileListAsArray[key] only save new uploaded images, we need to calculate number of old images
    // to find exactly index of images deleted
    if(i > amountOfOldImages-1) this.fileListNeedtoSave[key].splice(i - amountOfOldImages, 1);
    this.groupedPeople1[key].splice(i, 1);
  }

  groupArrayOfObjects(list) {
    return list.reduce(function (rv, x) {
      (rv[x["color"]["id"]] = rv[x["color"]["id"]] || []).push(x);
      return rv;
    }, {});
  }
}
