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
  inventories: Inventory[] = [];
  filteredInventories: Inventory[] = [];
  selectedInventory: any;
  searchInventory!: string;
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
      next: (response) => {
        this.inventories = response;
        this.filteredInventories = response;
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
    this.productService.getInventories().subscribe({
      next: (response) => {
        this.inventories = response.filter(
          (inventory) => inventory.quantity === this.selectedInventory
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
          this.toaster.success(
            'Inventory have been created successfully',
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
}
