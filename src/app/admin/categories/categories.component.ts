import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interface/category';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  isSubmitted = false;
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  selectedCategory: any;
  imgFile: any;
  imageName: any;
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
    image: new FormControl(File, [Validators.required]),
  });

  ngOnInit(): void {
    this.onGetCategories();
  }

  onGetCategories(): void {
    this.productService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
        this.filteredCategories =response;
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
  get imageValid() {
    return this.newCategory.controls['image'].valid;
  }
  onSelectImage(event: any): void {
    this.imgFile = event.target.files[0];
    this.newCategory.patchValue({
      image: this.imgFile,
    });
    this.imageName = this.imgFile.name;
  }

  valueSelected() {
    this.productService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.filter(category => category.name === this.selectedCategory);
      },
      error: (error: any) => {
        alert(error.message);
      },
    });
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
      newCategoryFormData.append('image', this.imgFile);
      const formDataObj: any = Object.fromEntries(newCategoryFormData.entries());
      this.productService.createCategory(formDataObj).subscribe({
        next: (response) => {
          this.toaster.success(
            'Category have been created successfully',
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

  onDelete(id: number) {
    this.productService.deleteCategory(id).subscribe({
      next: (response) => {
        this.toaster.success(
          'Category have been deleted successfully',
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
