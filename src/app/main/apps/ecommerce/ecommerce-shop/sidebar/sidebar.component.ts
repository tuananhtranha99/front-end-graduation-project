import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { EcommerceService } from '../../ecommerce.service';

@Component({
  selector: 'ecommerce-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../ecommerce-shop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EcommerceSidebarComponent implements OnInit {
  // Public
  // public sliderPriceValue = [1, 100];
  public brands = [];
  public checkedBrands = [];
  public priceRanges = [
    {id: 0, name: "Tất cả"},
    {id: 1, name: "Dưới 5 triệu"},
    {id: 2, name: "5-10 triệu"},
    {id: 3, name: "10-15 triệu"},
    {id: 4, name: "15-20 triệu"},
    {id: 5, name: "Trên 20 triệu"}
  ];
  public checkedPriceRange; 
  @Output() onSearch = new EventEmitter<any>();
  constructor(private _ecommerceService: EcommerceService) {}

  ngOnInit(): void {
    this.getAllBrand();
  }

  getAllBrand(){
    this._ecommerceService.getBrandList().subscribe(res => {
      this.brands = res;
      console.log("aaaaaaaaaaa", this.brands)
    })
  }

  findByCondition(){
    this.onSearch.emit(
      {
        checkedBrands: this.checkedBrands,
        checkedPriceRange: this.checkedPriceRange
      });
  }

  changePriceRange(element){
    this.checkedPriceRange = +element.target.value;
    console.log("priceRange",  this.checkedPriceRange)
  }

  addOrRemoveCheckForBrand(element, brandId){
    const isChecked = element.target.checked;
    if(isChecked){
      this.checkedBrands.push(brandId);
    } else {
      this.checkedBrands.splice(this.checkedBrands.findIndex(b => b == brandId), 1);
    }
  }
}
