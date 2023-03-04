import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Discount } from 'src/app/interface/discount';

@Component({
  selector: 'app-new-discount',
  templateUrl: './new-discount.component.html',
  styleUrls: ['./new-discount.component.css']
})
export class NewDiscountComponent {
  isSubmitted = false;
  discounts: any;
  filteredDiscounts: any;
  selectedDiscount: any;
  selectedActiveOption:any;
  searchDiscount!: string;
  successMessage: any;
  errorMessage: any;
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
    active: new FormControl(0, [Validators.required]),
  });
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
  radioButtonChangeHandler(event: any) {
    let value = event.target.value;
    if (value === 'true') {
      this.selectedActiveOption = 1;
    } else {
      this.selectedActiveOption = 0;
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
        'discount_percent',
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
          this.successMessage = `Great, Discount Coupoun created successfully!`;
          this.router.navigateByUrl('/admin/discounts')
        },
        error: (error: any) => {
          this.errorMessage = `OPPS!! ${error.message}`;
        },
      });
    }
  }
}
