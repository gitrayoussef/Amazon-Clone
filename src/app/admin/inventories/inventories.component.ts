import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Inventory } from 'src/app/interface/inventory';


@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.component.html',
  styleUrls: ['./inventories.component.css'],
})
export class InventoriesComponent implements OnInit {
  isSubmitted = false;
  inventories: any;
  filteredInventories: any;
  selectedInventory: any;
  searchInventory!: string;
  successMessage: any;
  errorMessage: any;
  constructor(
    private productService: ProductService,
    public fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router
  ) {}
  newInventory = this.fb.group({
    quantity: new FormControl('', [
      Validators.required,
      Validators.min(0)
    ])
  });
  ngOnInit(): void {
    this.onGetInventories();
  }
  onGetInventories(): void {
    this.productService.getInventories().subscribe({
      next: (response :any) => {
        this.inventories = response['data'];
        this.filteredInventories = response['data'];
      },
      error: (error: any) => {
        alert(error.message);
      },
    });
  }
  get quantityValid() {
    return this.newInventory.controls['quantity'].valid;
  }
  valueSelected() {
    this.inventories = this.filteredInventories;
    this.inventories = this.filteredInventories.filter(
      (inventory: any) =>
       inventory['attributes'].quantity ==
        this.searchInventory
    );       
  }
  refreshComponent() {
    this.ngOnInit();
  }

  onSubmit(): void {
    if (!this.newInventory.valid) {
      this.isSubmitted = true;
    }
    if (this.newInventory.valid) {
      const newInventoryFormData: any = new FormData();
      newInventoryFormData.append('quantity', this.newInventory.get('quantity')?.value);
      const formDataObj: any = Object.fromEntries(
        newInventoryFormData.entries()
      );
      this.productService.createInventory(formDataObj).subscribe({
        next: (response) => {
          this.successMessage = `Great, Inventory Quantity created successfully!`;
          this.router.navigateByUrl('/admin/products');
        },
        error: (error: any) => {
          this.errorMessage = `OPPS!! ${error.message}`;
        },
      });
    }
  }
}
