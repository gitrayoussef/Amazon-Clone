import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  isSubmitted = false;
  imageName: any;
  imgFile: any;
  categories: any;
  inventories: any;
  discounts: any;
  successMessage: any;
  errorMessage: any;

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
    this.onGetInventories();
  }

  onGetCategories(): void {
    this.productService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response['data'];
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
      },
      error: (error: any) => {
        alert(error.message);
      },
    });
  }
  onGetInventories(): void {
    this.productService.getInventories().subscribe({
      next: (response :any) => {
        this.inventories = response['data'];    
      },
      error: (error: any) => {
        alert(error.message);
      },
    });
  }
  newProduct = this.fb.group({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(10),
    ]),
    desc: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.minLength(20),
    ]),
    category_id: new FormControl('', Validators.required),
    inventory_id: new FormControl('', Validators.required),
    price: new FormControl('', [
      Validators.required,
      Validators.max(15000),
      Validators.min(0),
    ]),
    discount_id: new FormControl('', Validators.required),
    image: new FormControl(null, [Validators.required]),
  });

  get nameValid() {
    return this.newProduct.controls['name'].valid;
  }
  get descValid() {
    return this.newProduct.controls['desc'].valid;
  }
  get categoryValid() {
    return this.newProduct.controls['category_id'].valid;
  }
  get inventoryValid() {
    return this.newProduct.controls['inventory_id'].valid;
  }
  get priceValid() {
    return this.newProduct.controls['price'].valid;
  }
  get discountValid() {
    return this.newProduct.controls['discount_id'].valid;
  }
  get imageValid() {
    return this.newProduct.controls['image'].valid;
  }

  onSelectImage(event: any): void {
    this.imgFile = event.target.files[0];
    this.newProduct.patchValue({
      image: this.imgFile,
    });
    this.imageName = this.imgFile.name;
  }
  onSubmit(): void {
    if (!this.newProduct.valid) {
      this.isSubmitted = true;
    }
    if (this.newProduct.valid) {   
      const newProductFormData: any = new FormData();
      newProductFormData.append('name', this.newProduct.get('name')?.value);
      newProductFormData.append('desc', this.newProduct.get('desc')?.value);
      newProductFormData.append(
        'category_id',
        this.newProduct.get('category_id')?.value
      );
      newProductFormData.append(
        'inventory_id',
        this.newProduct.get('inventory_id')?.value
      );
      newProductFormData.append('price', this.newProduct.get('price')?.value);
      newProductFormData.append(
        'discount_id',
        this.newProduct.get('discount_id')?.value
      );
      newProductFormData.append(
        'rating',
        0
      );
      newProductFormData.append('image', this.imgFile);
      this.productService.createProduct(newProductFormData).subscribe({
        next: (response) => {
          this.successMessage = `Great, Product created successfully!`;
          this.router.navigateByUrl('/admin/products')
        },
        error: (error: any) => {
          this.errorMessage = `OPPS!! ${error.error.error}`;
        },
      });
    }
  }
}
