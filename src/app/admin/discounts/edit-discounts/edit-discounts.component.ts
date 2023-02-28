import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Discount } from 'src/app/interface/discount';

@Component({
  selector: 'app-edit-discounts',
  templateUrl: './edit-discounts.component.html',
  styleUrls: ['./edit-discounts.component.css'],
})
export class EditDiscountsComponent implements OnInit {
  isSubmitted = false;
  discountId: number = 0;
  discount!: any;
  discounts: Discount[] = [];
  selectedActiveOption: Boolean = false;
  editDiscount = this.fb.group({
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
  constructor(
    private productService: ProductService,
    public fb: FormBuilder,
    private myActivated: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.onGetDiscount();
  }
  onGetDiscount(): void {
    this.discountId = this.myActivated.snapshot.params['id'];
    this.productService.getDiscount(this.discountId).subscribe({
      next: (response) => {
        this.discount = response;
        this.editDiscount.controls['name'].setValue(this.discount['name']);
        this.editDiscount.controls['desc'].setValue(this.discount['desc']);
        this.editDiscount.controls['percent'].setValue(
          this.discount['percent']
        );
        this.editDiscount.controls['active'].setValue(this.discount['active']);
      },
      error: (error: any) => {
        alert(error.message);
      },
    });
  }
  get nameValid() {
    return this.editDiscount.controls['name'].valid;
  }
  get descValid() {
    return this.editDiscount.controls['desc'].valid;
  }
  get percentValid() {
    return this.editDiscount.controls['percent'].valid;
  }
  get activeValid() {
    return this.editDiscount.controls['active'].valid;
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
    if (!this.editDiscount.valid) {
      this.isSubmitted = true;
    }
    if (this.editDiscount.valid) {
      const newDiscountFormData: any = new FormData();
      newDiscountFormData.append('name', this.editDiscount.get('name')?.value);
      newDiscountFormData.append('desc', this.editDiscount.get('desc')?.value);
      newDiscountFormData.append(
        'percent',
        this.editDiscount.get('percent')?.value
      );
      newDiscountFormData.append('active', this.selectedActiveOption);
          const formDataObj: any = Object.fromEntries(
            newDiscountFormData.entries()
          );
          this.productService.updateDiscount( this.discountId, formDataObj).subscribe({
            next: (response) => {
              this.toaster.success(
                'Discount coupon have been edited successfully',
                'Great Job!',
                {
                  timeOut: 3000,
                }
              );
              this.router.navigate(['admin/discounts']);
            },
            error: (error: any) => {
              this.toaster.error(error.message, 'OOPS!', {
                timeOut: 3000,
              });
            },
          });
    }
  }
}
