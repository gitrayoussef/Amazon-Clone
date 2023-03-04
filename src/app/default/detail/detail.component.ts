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
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  isSubmitted = false;
  hidden: boolean = true;
  productId = this.myActivated.snapshot.params['id'];
  user!: any;
  users!: any;
  product!: any;
  videoId!: any;
  productAvaliability!: any;
  reviews!: any;
  productReviews!: any;
  productReviewsLength!: any;
  userName!: any;
  products!: any;
  rate!: any;
  popularProducts: any = [];
  relatedProducts: any = [];
  url = 'http://localhost:8000/api/products';
  itemQuantity!: any;
  userCart: any = [];
  customOptions: OwlOptions = {
    loop: true,
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
    this.getRequestedProduct();
    this.getAllReviewOnProduct();
    this.getAllUsers();
  }
  newReview = this.fb.group({
    user_id: new FormControl(''),
    product_id: new FormControl(this.productId),
    rate: new FormControl(this.rate),
    desc: new FormControl(''),
  });
  addToCartForm = this.fb.group({
    session_id: new FormControl(''),
    product_id: new FormControl(this.productId),
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
      this.getRelatedProducts(products);
    });
  }
  getPopularProducts(products: any) {
    this.popularProducts = [];
    for (const product of products) {
      if (
        product['attributes'].rating == 5 &&
        this.popularProducts.length < 3
      ) {
        this.popularProducts.push(product);
      }
    }
  }
  getRelatedProducts(products: any) {
    this.relatedProducts = [];
    for (const product of products) {
      if (
        product['attributes'].Category['Category-id'] ==
        this.product['attributes'].Category['Category-id']
      ) {
        this.relatedProducts.push(product);
      }
    }
  }
  getRequestedProduct() {
    this.productService.getProduct(this.productId).subscribe({
      next: (response: any) => {
        this.product = response['data'];
        this.getYouTubeReview(this.product['attributes'].name);
        magnify('myimage', 4, this.product['attributes'].imagepath);
        if (this.product['attributes'].Inventory['attributes'].quantity == 0) {
          this.productAvaliability = false;
        } else if (
          this.product['attributes'].Inventory['attributes'].quantity == 1
        ) {
          this.productAvaliability = 'Only 1 Item Left';
        } else {
          this.productAvaliability = 'In Stock';
        }
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  getYouTubeReview(name: any) {
    if (this.product) {
      let apiKey = 'AIzaSyBMS-m_uyQcjm9UAt1EQgORXIfIZw6K9lQ';
      let baseApiUrl = 'https://www.googleapis.com/youtube/v3';
      let url = `${baseApiUrl}/search?key=${apiKey}&type=video&part=snippet&q=${name}`;
      this.http.get(url).subscribe((result: any) => {
        if (result['items'].length == 0) {
          this.hidden = true;
        } else {
          this.hidden = false;
          this.videoId = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${result['items'][0].id.videoId}`
          );
        }
      });
    }
  }
  getAllReviewOnProduct() {
    this.productService.getReviews().subscribe((response: any) => {
      this.reviews = response['data'];
      this.productReviews = [];
      for (const review of this.reviews) {
        if (review.product_id == this.productId) {
          this.productReviews.push(review);
        }
      }
      this.productReviewsLength = this.productReviews.length;
    });
  }
  getAllUsers() {
    this.productService.getUsers().subscribe((response: any) => {
      this.users = response['data'];
    });
  }
  onSubmit(): void {
    this.isSubmitted = true;
    const newReviewFormData: any = new FormData();
    newReviewFormData.append('user_id', this.loginService.user['user'].id);
    newReviewFormData.append(
      'product_id',
      this.newReview.get('product_id')?.value
    );
    newReviewFormData.append('rate', this.newReview.get('rate')?.value);
    newReviewFormData.append('desc', this.newReview.get('desc')?.value);

    const formDataObj: any = Object.fromEntries(newReviewFormData.entries());
    this.productService.createReviews(formDataObj).subscribe({
      next: (response) => {
        this.ngOnInit();
      },
    });
  }
  addTocart() {
    const newCartFormData: any = new FormData();
    newCartFormData.append('session_id', this.loginService.session.shopping);
    newCartFormData.append('product_id', this.productId);
    newCartFormData.append(
      'quantity',
      this.addToCartForm.get('quantity')?.value
    );
    const formDataObj: any = Object.fromEntries(newCartFormData.entries());
    this.productService.createCarts(formDataObj).subscribe({
      next: (response: any) => {
        this.ngOnInit();
      },
    });
    this.productService.notifyAboutCartChange(this.userCart.length);
  }
  increaseItems() {
    let itemQuantity = this.addToCartForm.get('quantity')?.value;
    this.userCart = [];
    if (itemQuantity) {
      this.addToCartForm.controls['quantity'].setValue(itemQuantity + 1);
      this.productService.getCarts().subscribe((response: any) => {
        let carts = response['data'];
        for (const cart of carts) {
          if (cart.session_id == this.loginService.session.shopping) {
            this.userCart.push(cart);
          }
        }
      });
    }
  }
  decreaseItems() {
    let itemQuantity = this.addToCartForm.get('quantity')?.value;
    if (itemQuantity) {
      this.addToCartForm.controls['quantity'].setValue(itemQuantity - 1);
      this.productService.getCarts().subscribe((response: any) => {
        let carts = response['data'];
        for (const cart of carts) {
          if (cart.session_id == this.loginService.session.shopping) {
            this.userCart.pull(cart);
          }
        }
      });
    }
  }
}

function magnify(imgID: any, zoom: any, src: any) {
  var img: any, glass: any, w: any, h: any, bw: any;
  img = document.getElementById(imgID);
  /*create magnifier glass:*/
  glass = document.createElement('DIV');
  glass.setAttribute('class', 'img-magnifier-glass');
  /*insert magnifier glass:*/
  img.parentElement.insertBefore(glass, img);
  /*set background properties for the magnifier glass:*/
  glass.style.backgroundImage = "url('" + src + "')";
  glass.style.backgroundRepeat = 'no-repeat';
  glass.style.backgroundSize = 400 * zoom + 'px ' + 400 * zoom + 'px';
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;
  /*execute a function when someone moves the magnifier glass over the image:*/
  glass.addEventListener('mousemove', moveMagnifier);
  img.addEventListener('mousemove', moveMagnifier);
  /*and also for touch screens:*/
  glass.addEventListener('touchmove', moveMagnifier);
  img.addEventListener('touchmove', moveMagnifier);
  function moveMagnifier(e: any) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /*prevent the magnifier glass from being positioned outside the image:*/
    if (x > img.width - w / zoom) {
      x = img.width - w / zoom;
    }
    if (x < w / zoom) {
      x = w / zoom;
    }
    if (y > img.height - h / zoom) {
      y = img.height - h / zoom;
    }
    if (y < h / zoom) {
      y = h / zoom;
    }
    /*set the position of the magnifier glass:*/
    glass.style.left = x - w + 'px';
    glass.style.top = y - h + 'px';
    /*display what the magnifier glass "sees":*/
    glass.style.backgroundPosition =
      '-' + (x * zoom - w + bw) + 'px -' + (y * zoom - h + bw) + 'px';
  }
  function getCursorPos(e: any) {
    var a,
      x = 0,
      y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }
}
