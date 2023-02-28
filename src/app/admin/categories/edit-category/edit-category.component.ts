import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interface/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  isSubmitted = false;
  imageName: any;
  imgFile: any;
  categoryId: number = 0;
  category!: any;
  categories: Category[] = [];
  editCategory = this.fb.group({
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
    image: new FormControl(null, [Validators.required]),
  });

  constructor(
    private productService: ProductService,
    public fb: FormBuilder,
    private myActivated: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.onGetCategory();    
  }
  onGetCategory(): void {
    this.categoryId = this.myActivated.snapshot.params['id'];
    this.productService.getCategory(this.categoryId).subscribe({
      next: (response) => {
        this.category = response;
        this.editCategory.controls['name'].setValue(this.category['name']);
        this.editCategory.controls['desc'].setValue(this.category['desc']);
        this.editCategory.controls['image'].setValue(this.category['image']);
      },
      error: (error: any) => {
        alert(error.message)
      },
    });
  }

  get nameValid() {
    return this.editCategory.controls['name'].valid;
  }
  get descValid() {
    return this.editCategory.controls['desc'].valid;
  }
  get imageValid() {
    return this.editCategory.controls['image'].valid;
  }
  onSelectImage(event: any): void {
    this.imgFile = event.target.files[0];
    this.editCategory.patchValue({
      image: this.imgFile,
    });
    this.imageName = this.imgFile.name;
  }

  onSubmit(): void {
    if (!this.editCategory.valid) {
      this.isSubmitted = true;
    }
    if (this.editCategory.valid) {
      const newCategoryFormData: any = new FormData();
      newCategoryFormData.append('name', this.editCategory.get('name')?.value);
      newCategoryFormData.append('desc', this.editCategory.get('desc')?.value);
      newCategoryFormData.append('image', this.imgFile);
      const formDataObj: any = Object.fromEntries(newCategoryFormData.entries());
      console.log(formDataObj);
      
      this.productService.updateCategory(this.categoryId, formDataObj).subscribe({
        next: (response) => {
          this.toaster.success(
            'Category have been edited successfully',
            'Great Job!',
            {
              timeOut: 3000,
            }
          );
          this.router.navigate(['admin/categories']);
        },
        error: (error: any) => {
          this.toaster.error(error.message, 'OOPS!', {
            timeOut: 3000,
          });
        },
      });
    }
  }

}

