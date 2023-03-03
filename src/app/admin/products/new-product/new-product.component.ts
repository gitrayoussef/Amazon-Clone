import { Component } from '@angular/core';

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
}
