import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfterLoginService } from '../services/after-login.service';
import { BeforeLoginService } from '../services/before-login.service';
import { CartComponent } from './cart/cart.component';
import { DefaultComponent } from './default.component';
import { DetailComponent } from './detail/detail.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'forget-password',
        component: ForgetPasswordComponent,
        canActivate: [BeforeLoginService],
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        canActivate: [BeforeLoginService],
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'home',
        component: IndexComponent,
      },
      {
        path: 'categories/:id/:categoryName/page/:pageNumber',
        component: SidebarComponent,
      },
      {
        path: 'products/:id',
        component: DetailComponent,
        canActivate: [AfterLoginService]
      },
      {
        path: 'cart',
        component: CartComponent,
        canActivate: [AfterLoginService]
      },
      {
        path: 'checkout',
        component: OrderComponent,
        canActivate: [AfterLoginService]
      }
      ,
      {
        path: 'thankyou',
        component: ThankyouComponent,
        canActivate: [AfterLoginService]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultRoutingModule {}
