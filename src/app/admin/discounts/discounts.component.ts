import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Discount } from 'src/app/interface/discount';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css'],
})
export class DiscountsComponent implements OnInit {
  isSubmitted = false;
  discounts: any;
  filteredDiscounts: any;
  selectedDiscount: any;
  selectedActiveOption: Boolean = false;
  searchDiscount!: string;
  successMessage: any;
  errorMessage: any;
  constructor(
    private productService: ProductService,
    public fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.onGetDiscounts();
  }
  onGetDiscounts(): void {
    this.productService.getDiscounts().subscribe({
      next: (response) => {
        this.discounts = response['data'];
        this.filteredDiscounts = response['data'];
      },
      error: (error: any) => {
        alert(error.message);
      },
    });
  }
  valueSelected() {
    this.discounts = this.filteredDiscounts;
    this.discounts = this.discounts.filter(
      (discount: any) =>
       discount['attributes'].name ==
        this.searchDiscount
    );       
  }
  refreshComponent() {
    this.ngOnInit();
  }

  onDelete(id: number) {
    this.productService.deleteDiscount(id).subscribe({
      next: (response) => {
        this.successMessage = `Great, Discount Coupoun deleted successfully!`;
        this.ngOnInit()
      },
      error: (error: any) => {
        this.errorMessage = `OPPS!! ${error.message}`;
      },
    });
  }
}
