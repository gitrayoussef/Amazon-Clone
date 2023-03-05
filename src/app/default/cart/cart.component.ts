import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormControl } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  products!: any;
  popularProducts: any = [];
  url = 'http://localhost:8000/api/products';
  itemQuantity!: any;
  userCart: any = [];
  addBtnClick: any = false;
  totalPrice: any = 0;
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
      994: {
        items: 5,
      },
      1200: {
        items: 6,
      },
    },
    nav: true,
  };
  constructor(
    private productService: ProductService,
    private myActivated: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    public fb: FormBuilder,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.getProducts(this.url, this.products);
    this.getCarts();
  }
  addToCartForm = this.fb.group({
    session_id: new FormControl(''),
    product_id: new FormControl(''),
    quantity: new FormControl(1),
  });
  getProducts(url: string, products: any[]) {
    this.http.get(url).subscribe((response: any) => {
      if (products === undefined) {
        products = response['data'];
      } else {
        products = products.concat(response['data']);
      }
      if (response['links'].next != null) {
        this.getProducts(response['links'].next, products);
      }
      this.products = products;
      this.getPopularProducts(products);
    });
  }
  getPopularProducts(products: any) {
    this.popularProducts = [];
    for (const product of products) {
      if (product['attributes'].rating == 5) {
        this.popularProducts.push(product);
      }
    }
  }
  increaseItems(cartId: any, session: any, quantity: any, productId: any) {
    this.addBtnClick = true;
    this.addToCartForm.controls['product_id'].setValue(productId);
    const newCartFormData: any = new FormData();
    newCartFormData.append('session_id', session);
    newCartFormData.append('product_id', productId);
    newCartFormData.append('quantity', quantity + 1);
    const formDataObj: any = Object.fromEntries(newCartFormData.entries());
    this.productService.deleteCarts(cartId).subscribe({
      next: (response: any) => {
        this.productService.createCarts(formDataObj).subscribe({
          next: (response: any) => {
            this.ngOnInit();
          },
        });
      },
    });
  }
  decreaseItems(cartId: any, session: any, quantity: any, productId: any) {
    this.addBtnClick = true;
    this.addToCartForm.controls['product_id'].setValue(productId);
    const newCartFormData: any = new FormData();
    newCartFormData.append('session_id', session);
    newCartFormData.append('product_id', productId);
    newCartFormData.append('quantity', quantity - 1);
    const formDataObj: any = Object.fromEntries(newCartFormData.entries());
    this.productService.deleteCarts(cartId).subscribe({
      next: (response: any) => {
        this.productService.createCarts(formDataObj).subscribe({
          next: (response: any) => {
            this.ngOnInit();
          },
        });
      },
    });
  }
  getCarts() {
    this.productService.getCarts().subscribe((response: any) => {
      this.userCart = [];
      this.totalPrice = 0;
      let carts = response['data'];
      for (const cart of carts) {
        if (cart.session_id == this.loginService.session.shopping) {
          this.userCart.push(cart);
          this.totalPrice = this.totalPrice + cart.price * cart.quantity;
        }
      }
    });
  }
  deleteCart(cartId: any) {
    this.productService.deleteCarts(cartId).subscribe({
      next: (response: any) => {
        this.ngOnInit();
      },
    });
  }
  checkout() {
    let order_id: any;
    const newOrderFormData: any = new FormData();
    newOrderFormData.append('user_id', this.loginService.user['user'].id);
    newOrderFormData.append('total', this.totalPrice);
    newOrderFormData.append('payement_id', 1);
    const formDataObj: any = Object.fromEntries(newOrderFormData.entries());
    this.productService.createOrder(formDataObj).subscribe((response: any) => {
      order_id = response['order_id'];
      this.productService.order_id = order_id;
      for (const cart of this.userCart) {
        const newOrderItemsFormData: any = new FormData();
        newOrderItemsFormData.append('order_id', order_id);
        newOrderItemsFormData.append('product_id', cart.product_id);
        newOrderItemsFormData.append('quantity', cart.quantity);
        const formDataObj: any = Object.fromEntries(
          newOrderItemsFormData.entries()
        );
        this.productService
          .createOrderItems(formDataObj)
          .subscribe((response: any) => {
            this.productService
              .deleteCarts(cart.id);
              this.router.navigateByUrl('/checkout')
          });
      }
    });
  }
}
