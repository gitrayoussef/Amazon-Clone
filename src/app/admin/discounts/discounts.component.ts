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
  discounts: Discount[] = [];
  filteredDiscounts: Discount[] = [];
  selectedDiscount: any;
  selectedActiveOption: Boolean = false;
  searchDiscount!: string;
  constructor(
    private productService: ProductService,
    public fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router
  ) {}
  newDiscount = this.fb.group({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(25),
      Validators.minLength(3),
    ]),
    desc: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.minLength(20),
    ]),
    percent: new FormControl('', [
      Validators.required,
      Validators.max(100),
      Validators.min(0),
    ]),
    active: new FormControl(false, [Validators.required]),
  });
  ngOnInit(): void {
    this.onGetDiscounts();
  }
  onGetDiscounts(): void {
    this.productService.getDiscounts().subscribe({
      next: (response) => {
        this.discounts = response;
        this.filteredDiscounts = response;
      },
      error: (error: any) => {
        alert(error.message);
      },
    });
  }
  get nameValid() {
    return this.newDiscount.controls['name'].valid;
  }
  get descValid() {
    return this.newDiscount.controls['desc'].valid;
  }
  get percentValid() {
    return this.newDiscount.controls['percent'].valid;
  }
  get activeValid() {
    return this.newDiscount.controls['active'].valid;
  }
  valueSelected() {
    this.productService.getDiscounts().subscribe({
      next: (response) => {
        this.discounts = response.filter(
          (discount) => discount.name === this.selectedDiscount
        );
      },
      error: (error: any) => {
        alert(error.message);
      },
    });
  }
  refreshComponent() {
    this.ngOnInit();
  }
  radioButtonChangeHandler(event: any) {
    let value = event.target.value;
    if (value === 'true') {
      this.selectedActiveOption = true;
    } else {
      this.selectedActiveOption = false;
    }
  }
  onSubmit(): void {
    if (!this.newDiscount.valid) {
      this.isSubmitted = true;
    }
    if (this.newDiscount.valid) {
      const newDiscountFormData: any = new FormData();
      newDiscountFormData.append('name', this.newDiscount.get('name')?.value);
      newDiscountFormData.append('desc', this.newDiscount.get('desc')?.value);
      newDiscountFormData.append(
        'percent',
        this.newDiscount.get('percent')?.value
      );
      newDiscountFormData.append(
        'active',
        this.selectedActiveOption
      );
      const formDataObj: any = Object.fromEntries(
        newDiscountFormData.entries()
      );
      this.productService.createDiscount(formDataObj).subscribe({
        next: (response) => {
          this.toaster.success(
            'Discount coupon have been created successfully',
            'Great Job!',
            {
              timeOut: 3000,
            }
          );
          this.ngOnInit();
        },
        error: (error: any) => {
          this.toaster.error(error.message, 'OOPS!', {
            timeOut: 3000,
          });
        },
      });
    }
  }
  onDelete(id: number) {
    this.productService.deleteDiscount(id).subscribe({
      next: (response) => {
        this.toaster.success(
          'Discount coupon have been deleted successfully',
          'Great Job!',
          {
            timeOut: 3000,
          }
        );
        this.ngOnInit();
      },
      error: (error: any) => {
        this.toaster.error(error.message, 'OOPS!', {
          timeOut: 3000,
        });
      },
    });
  }
}
