import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interface/category';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css'],
})
export class NewCategoryComponent {
  isSubmitted = false;
  categories: any;
  filteredCategories: any;
  selectedCategory: any;
  successMessage: any;
  errorMessage: any;
  constructor(
    private productService: ProductService,
    public fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router
  ) {}

  newCategory = this.fb.group({
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
  });

  ngOnInit(): void {
    this.onGetCategories();
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

  get nameValid() {
    return this.newCategory.controls['name'].valid;
  }
  get descValid() {
    return this.newCategory.controls['desc'].valid;
  }
  valueSelected() {
    this.categories = this.filteredCategories;
    this.categories = this.categories.filter(
      (category: any) => category['attributes'].name == this.selectedCategory
    );
  }
  refreshComponent() {
    this.ngOnInit();
  }
  onSubmit(): void {
    if (!this.newCategory.valid) {
      this.isSubmitted = true;
    }
    if (this.newCategory.valid) {
      const newCategoryFormData: any = new FormData();
      newCategoryFormData.append('name', this.newCategory.get('name')?.value);
      newCategoryFormData.append('desc', this.newCategory.get('desc')?.value);
      this.productService.createCategory(newCategoryFormData).subscribe({
        next: (response) => {
          this.successMessage = `Great, Category created successfully!`;
          this.router.navigateByUrl('/admin/categories')
        },
        error: (error: any) => {
          this.errorMessage = `OPPS!! ${error.message}`;
        },
      });
    }
  }
}
