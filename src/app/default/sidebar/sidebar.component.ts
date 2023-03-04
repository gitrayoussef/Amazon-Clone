import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Options } from '@angular-slider/ngx-slider';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  categoryId = this.myctivated.snapshot.params['id'];
  categoryName = this.myctivated.snapshot.params['categoryName'];
  pageNumber = this.myctivated.snapshot.params['pageNumber'];
  currentPageBeginIndex = 0;
  currentPageEndIndex = 0;
  totalProductsNumber = 0;
  categories: any = [];
  filteredCategories: any = [];
  products: any[] = [];
  pagesNumber: any[] = [];
  paginatedProducts: any[] = [];
  filterProductByPrice: any[] = [];
  filterProductByRating: any[] = [];
  filterProductByCategory: any[] = [];
  choseNumberPerPage = 9;
  url = 'http://localhost:8000/api/products';
  minValue: number = 200;
  maxValue: number = 1000;
  options: Options = {
    floor: 0,
    ceil: 2000,
    noSwitching: true,
    translate: (value: number): string => {
      return '$' + value;
    },
  };
  notifierSubscription: Subscription =
    this.productService.subjectNotifier.subscribe((notified) => {
      this.valueSelected(notified.categoryId, notified.categoryName, 1);
    });
  constructor(
    private productService: ProductService,
    private myctivated: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.onGetCategories();
    this.getProducts(this.url, this.products);
    this.valueSelected(this.categoryId, this.categoryName, this.pageNumber);
  }
  onGetCategories(): void {
    this.productService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response['data'];
        this.filteredCategories = response['data'];
      },
      error: (error: any) => {
        console.log(error.message);
      },
    });
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
      this.getFilterByRatingValue();
      this.getFilterProductByCategory();
    });
  }
  valueSelected(categoryId: any, categoryName: string, pageNumber: any) {
    this.categoryName = categoryName;
    this.categoryId = categoryId;
    this.pageNumber = pageNumber;
    this.router.navigateByUrl(
      `/categories/${categoryId}/${categoryName}/page/${pageNumber}`
    );
    this.getFilterByRatingValue();
    this.getFilterProductByCategory();
  }
  getFilterByPriceValue() {
    this.filterProductByPrice = this.filterProductByCategory;
    this.filterProductByPrice = this.filterProductByPrice.filter(
      (product) =>
        product['attributes'].price > this.minValue &&
        product['attributes'].price < this.maxValue
    );
  }
  refresh() {
    this.getFilterProductByCategory();
  }
  getFilterByRatingValue() {
    this.filterProductByRating = [];
    for (let product of this.products) {
      if (
        product['attributes'].Category['Category-id'] == this.categoryId &&
        product['attributes'].rating == 5 &&
        this.filterProductByRating.length < 3
      ) {
        this.filterProductByRating.push(product);
      }    
    }

  }
  getFilterProductByCategory() {
    this.filterProductByCategory = [];
    for (let product of this.products) {
      if (
        product['attributes'].Category['attributes'].name == this.categoryName
      ) {
        this.filterProductByCategory.push(product);
      }
    }
    this.filterProductByPrice = this.filterProductByCategory;
    this.getPagination();
    this.getPaginatedData(
      this.filterProductByPrice,
      this.pagesNumber,
      this.pageNumber
    );
  }
  getPagination() {
    let length = 1;
    this.pagesNumber = [];
    if (this.filterProductByPrice.length > this.choseNumberPerPage) {
      length = Math.ceil(
        this.filterProductByPrice.length / this.choseNumberPerPage
      );
      for (let i = 1; i <= length; i++) {
        this.pagesNumber.push(i);
      }
    } else {
      this.pagesNumber = [1];
    }
  }
  getPaginatedData(products: any, pagesNumber: any, currentPage: any) {
    if (pagesNumber.length > 1) {
      if (currentPage == 1) {
        this.filterProductByPrice = products.slice(0, this.choseNumberPerPage);
        this.currentPageBeginIndex = 1;
        this.currentPageEndIndex = this.filterProductByPrice.length;
      } else {
        this.filterProductByPrice = products.slice(
          (currentPage - 1) * this.choseNumberPerPage,
          currentPage * this.choseNumberPerPage
        );
        this.currentPageBeginIndex =
          (currentPage - 1) * this.choseNumberPerPage;
        this.currentPageEndIndex =
          this.filterProductByPrice.length + this.choseNumberPerPage;
      }
    } else {
      this.filterProductByPrice = products.slice(0);
      this.currentPageBeginIndex = 1;
      this.currentPageEndIndex = this.filterProductByPrice.length;
    }
    this.totalProductsNumber = this.filterProductByCategory.length;
  }
  goToPage(page: any) {
    this.valueSelected(this.categoryId, this.categoryName, page);
  }

  // getChoseNumberPerPage(sortNumber: any) {
  //   // this.choseNumberPerPage = sortNumber;
  //   console.log('gg');
    
  // }
}
