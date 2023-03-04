import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interface/category';
import { Discount } from 'src/app/interface/discount';
import { Inventory } from 'src/app/interface/inventory';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Product } from 'src/app/interface/product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  isSubmitted = false;
  imageName: any;
  imgFile: any;
  products: any;
  categories: any;
  inventories: Inventory[] = [];
  discounts: any;
  categoryName: any;
  searchByProductName!: string;
  searchByProductPrice!: string;
  filteredCategories: any;
  selectedCategory: any;
  filteredDiscounts: any;
  selectedDiscount: any;
  successMessage: any;
  errorMessage: any;
  url = 'http://localhost:8000/api/products';
  isNullElement: any;
  filteredProducts: any;
  constructor(
    private productService: ProductService,
    public fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.onGetCategories();
    this.onGetDiscounts();
    this.onGetProducts(this.url, this.products);
  }

  onGetProducts(url: string, products: any[]) {
    this.http.get(url).subscribe((response: any) => {
      if (products === undefined) {
        products = response['data'];
      } else {
        products = products.concat(response['data']);
      }
      if (response['links'].next != null) {
        this.onGetProducts(response['links'].next, products);
      }
      this.products = products;
      this.filteredProducts = products;
    });
  }

  onGetCategories(): void {
    this.productService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response['data'];
        this.filteredCategories = response['data'];
      },
      error: (error: any) => {
        alert(error.message);
      },
    });
  }

  onGetDiscounts(): void {
    this.productService.getDiscounts().subscribe({
      next: (response :any) => {
        this.discounts = response['data'];
        this.filteredDiscounts = response['data'];        
      },
      error: (error: any) => {
        alert(error.message);
      },
    });
  }
  valueSelected() {
    this.products = this.filteredProducts;
    this.products = this.products.filter(
      (product: any) =>
        product['attributes'].Category['attributes'].name ==
        this.selectedCategory
    );    
  }
  valueSelectedDiscount() {
    this.products = this.filteredProducts;
    this.products = this.products.filter(
      (product: any) =>
      product['attributes'].Discount && product['attributes'].Discount['attributes'].name ==
        this.selectedDiscount
    );        
  }
  refreshComponent() {
    this.ngOnInit();
  }
  onDelete(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        this.successMessage = `Great, Product deleted successfully!`;
        this.ngOnInit();
      },
      error: (error: any) => {
        this.errorMessage = `OPPS!! ${error.error.error}`;
      },
    });
  }
}
