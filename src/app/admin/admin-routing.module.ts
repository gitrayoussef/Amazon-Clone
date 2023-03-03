import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoriesComponent } from './categories/categories.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { EditDiscountsComponent } from './discounts/edit-discounts/edit-discounts.component';
import { InventoriesComponent } from './inventories/inventories.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { NewProductComponent } from './products/new-product/new-product.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'products/:id/edit',
        component: EditProductComponent,
      },
      {
        path: 'products/new',
        component: NewProductComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'categories/:id/edit',
        component: EditCategoryComponent,
      },
      {
        path: 'discounts',
        component: DiscountsComponent,
      },
      {
        path: 'discounts/:id/edit',
        component: EditDiscountsComponent,
      },
      {
        path: 'inventories',
        component: InventoriesComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
