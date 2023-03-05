import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  isSubmitted = false;
  errorMessage: any;
  invalid = false;
  paywithstripegate = false;
  totalPrice: any = 0;
  constructor(
    private productService: ProductService,
    private loginService: LoginService,
    public fb: FormBuilder,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.getTotalPrice();
  }
  orderAddress = this.fb.group({
    address_line1: new FormControl('', [Validators.required]),
    address_line2: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    postal_code: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required]),
  });
  paywithstripegateform = this.fb.group({
    card_no: new FormControl('4242 4242 4242 4242'),
    exp_month: new FormControl('12'),
    exp_year: new FormControl('34'),
    cvv_no: new FormControl('567'),
    amount: new FormControl(this.totalPrice),
    desc: new FormControl('this is the user one'),
  });

  getTotalPrice() {
    this.productService
      .getOrder(this.productService.order_id)
      .subscribe((response: any) => {
        this.totalPrice = response['user'].total;
      });
  }

  onSubmit(): void {
    if (!this.orderAddress.valid) {
      this.isSubmitted = true;
      this.invalid = true;
      this.errorMessage = 'Field Required';
    } else {
      const user: any = new FormData();
      user.append('user_id', this.loginService.user['user'].id);
      user.append(
        'address_line1',
        this.orderAddress.controls['address_line1']?.value
      );
      user.append(
        'address_line2',
        this.orderAddress.controls['address_line2']?.value
      );
      user.append('city', this.orderAddress.controls['city']?.value);
      user.append('country', this.orderAddress.controls['country']?.value);
      user.append(
        'postal_code',
        this.orderAddress.controls['postal_code']?.value
      );
      user.append('telephone', this.orderAddress.controls['telephone']?.value);
      user.append('mobile', this.orderAddress.controls['mobile']?.value);
      const formDataObj: any = Object.fromEntries(user.entries());
      this.productService.storeAddress(formDataObj).subscribe({
        next: (response: any) => {
         this.router.navigateByUrl('/thankyou')
        },
      });
    }
  }

  paywithstripe() {
    this.paywithstripegate = true;
  }

  onSubmitStripe(): void {
    if (this.orderAddress.valid) {
      const strpie: any = new FormData();
      strpie.append(
        'card_no',
        this.paywithstripegateform.controls['card_no']?.value
      );
      strpie.append(
        'exp_month',
        this.paywithstripegateform.controls['exp_month']?.value
      );
      strpie.append(
        'exp_year',
        this.paywithstripegateform.controls['exp_year']?.value
      );
      strpie.append(
        'cvv_no',
        this.paywithstripegateform.controls['cvv_no']?.value
      );
      strpie.append(
        'card_no',
        this.paywithstripegateform.controls['card_no']?.value
      );
      strpie.append(
        'amount',
        this.paywithstripegateform.controls['amount']?.value
      );
      strpie.append('desc', this.paywithstripegateform.controls['desc']?.value);
      const formDataObj: any = Object.fromEntries(strpie.entries());
      this.productService.stripe(formDataObj).subscribe({
        next: (response: any) => {
          this.router.navigateByUrl('/thankyou')
        },
      });
    }
  }
}
