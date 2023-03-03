import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductService } from 'src/app/services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: false,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
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
  bannerOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>' ],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
  products: any[] = [];
  url = 'http://localhost:8000/api/products';
  productsOnsale: any = [];
  latestProducts: any = [];
  productsCollectionByCategory: any = [];
  categories: any;
  inventories: any;
  discounts: any;

  constructor(
    private productService: ProductService,
    private http: HttpClient,
  ) { 
   
  }
  ngOnInit(): void {
    this.onGetCategories();
    this.getProducts(this.url, this.products);
    this.onGetDiscounts();
  }
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
      this.onGetProductsOnSale();
      this.onGetLatestProductsByMonth();     
      this.showProductsByCategoryOnLoad();
    });
  }
  onGetCategories(): void {
    this.productService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response['data'];
      },
      error: (error: any) => {
        console.log(error.message);
      },
    });
  }

  onGetDiscounts(): void {
    this.productService.getDiscounts().subscribe({
      next: (response: any) => {
        this.discounts = response['data'];
      },
      error: (error: any) => {
        console.log(error.message);
      },
    });
  }

  onGetProductsOnSale(): void {
    for (const product of this.products) {
      if (product['attributes'].Discount) {
        let discountPercent =
          product['attributes'].Discount['attributes'].discount_percent;
        let active = product['attributes'].Discount['attributes'].active;
        if (discountPercent >= 15 && active === 1) {
          this.productsOnsale.push(product);
        }
      }
    }
  }

  onGetLatestProductsByMonth(): void {
    for (const product of this.products) {
      let creationMonth = new Date(product['attributes'].created_at).getMonth();
      let updateMonth = new Date(product['attributes'].updated_at).getMonth();
      let currentMonth = new Date(Date.now()).getMonth();
      if (creationMonth <= currentMonth - 1 || updateMonth <= currentMonth - 1) {
        this.latestProducts.push(product);
      }
    }
  }
  showProductsByCategory(categoryName: string) {
    this.productsCollectionByCategory = [];
    for (let product of this.products) {
      let productCategory = product['attributes'].Category['attributes'].name;
      if (productCategory === categoryName) {
        this.productsCollectionByCategory.push(product);
      }
    }
  }
  showProductsByCategoryOnLoad() {
    for (let product of this.products) {
      if(this.categories) {
        let categoryName = this.categories[0]['attributes'].name;
        let productCategory = product['attributes'].Category['attributes'].name;
        if (productCategory === categoryName) {
          this.productsCollectionByCategory.push(product);
        }
      }  
    }
  }
}
