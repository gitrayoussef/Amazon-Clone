import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoriesComponent } from './categories/categories.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { NewCategoryComponent } from './categories/new-category/new-category.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { EditDiscountsComponent } from './discounts/edit-discounts/edit-discounts.component';
import { NewDiscountComponent } from './discounts/new-discount/new-discount.component';
import { InventoriesComponent } from './inventories/inventories.component';
import { LoginComponent } from './login/login.component';
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
        path: 'categories/new',
        component: NewCategoryComponent,
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
        path: 'discounts/new',
        component: NewDiscountComponent,
      },
      {
        path: 'inventories',
        component: InventoriesComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
