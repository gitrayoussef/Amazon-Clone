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

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  isSubmitted = false;
  imageName: any;
  imgFile: any;
  products: Product[] = [];
  categories: Category[] = [];
  inventories: Inventory[] = [];
  discounts: Discount[] = [];
  categoryName: any;
  searchByProductName!: string;
  searchByProductPrice!: string;
  filteredCategories: Category[] = [];
  selectedCategory: any;
  filteredDiscounts: Discount[] = [];
  selectedDiscount: any;
  constructor(
    private productService: ProductService,
    public fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router
  ) {}

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
    category: new FormControl('', Validators.required),
    inventory: new FormControl('', Validators.required),
    price: new FormControl('', [
      Validators.required,
      Validators.max(15000),
      Validators.min(0),
    ]),
    discount: new FormControl('', Validators.required),
    image: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.onGetProducts();
    this.onGetCategories();
    this.onGetInventories();
    this.onGetDiscounts();
  }

  onGetProducts(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (error: any) => {
        alert(error.message);
      },
    });
  }

  onGetCategories(): void {
    this.productService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
        this.filteredCategories = response;
      },
      error: (error: any) => {
        alert(error.message);
      },
    });
  }

  onGetInventories(): void {
    this.productService.getInventories().subscribe({
      next: (response) => {
        this.inventories = response;
      },
      error: (error: any) => {
        alert(error.message);
      },
    });
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
    return this.newProduct.controls['name'].valid;
  }
  get descValid() {
    return this.newProduct.controls['desc'].valid;
  }
  get categoryValid() {
    return this.newProduct.controls['category'].valid;
  }
  get inventoryValid() {
    return this.newProduct.controls['inventory'].valid;
  }
  get priceValid() {
    return this.newProduct.controls['price'].valid;
  }
  get discountValid() {
    return this.newProduct.controls['discount'].valid;
  }
  get imageValid() {
    return this.newProduct.controls['image'].valid;
  }
  onFilterByCategory(product: any) {
    let category: any = this.categories.find(
      (category) => product['categoryId'] == category.id
    );
    if (category) {
      return category['name'];
    }
  }
  onFilterByInventory(product: any) {
    let inventory: any = this.inventories.find(
      (inventory) => product['inventoryId'] == inventory.id
    );
    if (inventory) {
      return inventory['quantity'];
    }
  }
  onFilterByDiscount(product: any) {
    let discount: any = this.discounts.find(
      (discount) => product['discountId'] == discount.id
    );
    if (discount) {
      return discount['name'];
    }
  }
  valueSelected() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.filter(
          (product) => product.categoryId == this.selectedCategory
        );
      },
      error: (error: any) => {
        alert(error.message);
      },
    });
  }
  valueSelectedDiscount() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.filter(
          (product) => product.discountId == this.selectedDiscount
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
        'categoryId',
        this.newProduct.get('category')?.value
      );
      newProductFormData.append(
        'inventoryId',
        this.newProduct.get('inventory')?.value
      );
      newProductFormData.append('price', this.newProduct.get('price')?.value);
      newProductFormData.append(
        'discountId',
        this.newProduct.get('discount')?.value
      );
      newProductFormData.append('image', this.imgFile);
      const formDataObj: any = Object.fromEntries(newProductFormData.entries());
      this.productService.createProduct(formDataObj).subscribe({
        next: (response) => {
          this.toaster.success(
            'Product have been created successfully',
            'Great Job!',
            {
              timeOut: 3000,
            }
          );
          this.ngOnInit();
          this.newProduct.controls['name'].setValue('');
          this.newProduct.controls['desc'].setValue('');
          this.newProduct.controls['category'].setValue('');
          this.newProduct.controls['inventory'].setValue('');
          this.newProduct.controls['price'].setValue('');
          this.newProduct.controls['discount'].setValue('');
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
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        this.toaster.success(
          'Product have been deleted successfully',
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
