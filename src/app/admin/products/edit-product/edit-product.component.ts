import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interface/category';
import { Inventory } from 'src/app/interface/inventory';
import { Discount } from 'src/app/interface/discount';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  // isSubmitted = false;
  // imageName: any;
  // imgFile: any;
  // productId: number = 0;
  // product!: any;
  // categories: Category[] = [];
  // inventories: Inventory[] = [];
  // discounts: Discount[] = [];
  // editProduct = this.fb.group({
  //   name: new FormControl('', [
  //     Validators.required,
  //     Validators.maxLength(50),
  //     Validators.minLength(10),
  //   ]),
  //   desc: new FormControl('', [
  //     Validators.required,
  //     Validators.maxLength(255),
  //     Validators.minLength(20),
  //   ]),
  //   category: new FormControl(0, Validators.required),
  //   inventory: new FormControl(0, Validators.required),
  //   price: new FormControl('', [
  //     Validators.required,
  //     Validators.max(15000),
  //     Validators.min(0),
  //   ]),
  //   discount: new FormControl(0, Validators.required),
  //   image: new FormControl(File, [Validators.required]),
  // });

  constructor(
    private productService: ProductService,
    public fb: FormBuilder,
    private myActivated: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.onGetProduct();
    // this.onGetCategories();
    // this.onGetInventories();
    // this.onGetDiscounts();
  }

  // onGetProduct(): void {
  //   this.productId = this.myActivated.snapshot.params['id'];
  //   this.productService.getProduct(this.productId).subscribe({
  //     next: (response) => {
  //       this.product = response;
  //       this.editProduct.controls['name'].setValue(this.product['name']);
  //       this.editProduct.controls['desc'].setValue(this.product['desc']);
  //       this.editProduct.controls['category'].setValue(
  //        parseInt(this.product['categoryId']) 
  //       );
  //       this.editProduct.controls['inventory'].setValue(
  //         parseInt(this.product['inventoryId'])
  //       );
  //       this.editProduct.controls['price'].setValue(this.product['price']);
  //       this.editProduct.controls['discount'].setValue(
  //         parseInt( this.product['discountId'])
  //       );
  //       this.editProduct.controls['image'].setValue(this.product['image']);    
  //     },
  //     error: (error: any) => {
  //       console.log(error);
  //     },
  //   });
  // }
  // onGetCategories(): void {
  //   this.productService.getCategories().subscribe({
  //     next: (response) => {
  //       this.categories = response;
  //     },
  //     error: (error: any) => {
  //       console.log(error);
  //     },
  //   });
  // }

  // onGetInventories(): void {
  //   this.productService.getInventories().subscribe({
  //     next: (response) => {
  //       this.inventories = response;
  //     },
  //     error: (error: any) => {
  //       console.log(error);
  //     },
  //   });
  // }

  // onGetDiscounts(): void {
  //   this.productService.getDiscounts().subscribe({
  //     next: (response) => {
  //       this.discounts = response;
  //     },
  //     error: (error: any) => {
  //       console.log(error);
  //     },
  //   });
  // }
  // get nameValid() {
  //   return this.editProduct.controls['name'].valid;
  // }
  // get descValid() {
  //   return this.editProduct.controls['desc'].valid;
  // }
  // get categoryValid() {
  //   return this.editProduct.controls['category'].valid;
  // }
  // get inventoryValid() {
  //   return this.editProduct.controls['inventory'].valid;
  // }
  // get priceValid() {
  //   return this.editProduct.controls['price'].valid;
  // }
  // get discountValid() {
  //   return this.editProduct.controls['discount'].valid;
  // }
  // get imageValid() {
  //   return this.editProduct.controls['image'].valid;
  // }
  // onFilterByCategory(product: any) {
  //   let category: any = this.categories.find(
  //     (category: any) => product['categoryId'] === category.id
  //   );
  //   if (category) {
  //     return category['name'];
  //   }
  // }
  // onFilterByInventory(product: any) {
  //   let inventory: any = this.inventories.find(
  //     (inventory: any) => product['inventoryId'] === inventory.id
  //   );
  //   if (inventory) {
  //     return inventory['quantity'];
  //   }
  // }
  // onFilterByDiscount(product: any) {
  //   let discount: any = this.discounts.find(
  //     (discount: any) => product['discountId'] === discount.id
  //   );
  //   if (discount) {
  //     return discount['name'];
  //   }
  // }
  // onSelectImage(event: any): void {
  //   this.imgFile = event.target.files[0]; 
  //   this.editProduct.patchValue({
  //     image: this.imgFile,
  //   });
  //   this.imageName = this.imgFile.name;
  // }
  // onSubmit(): void {
  //   if (!this.editProduct.valid) {
  //     this.isSubmitted = true;
  //   }
  //   if (this.editProduct.valid) {
  //     const editProductFormData: any = new FormData();
  //     editProductFormData.append('name', this.editProduct.get('name')?.value);
  //     editProductFormData.append('desc', this.editProduct.get('desc')?.value);
  //     editProductFormData.append(
  //       'categoryId',
  //       this.editProduct.get('category')?.value
  //     );
  //     editProductFormData.append(
  //       'inventoryId',
  //       this.editProduct.get('inventory')?.value
  //     );
  //     editProductFormData.append('price', this.editProduct.get('price')?.value);
  //     editProductFormData.append(
  //       'discountId',
  //       this.editProduct.get('discount')?.value
  //     );
  //     editProductFormData.append('image', this.imgFile);
  //     const formDataObj :any= Object.fromEntries(editProductFormData.entries());
  //     this.productService.updateProduct(this.productId, formDataObj).subscribe({
  //       next: (response) => {
  //         this.toaster.success(
  //           'Product have been edited successfully',
  //           'Great Job!',
  //           {
  //             timeOut: 3000,
  //           }
  //         );
  //         this.router.navigate(['admin/products']);
  //       },
  //       error: (error: any) => {
  //         this.toaster.error(error, 'OOPS!', {
  //           timeOut: 3000,
  //         });
  //       },
  //     });
  //   }
  // }
}
