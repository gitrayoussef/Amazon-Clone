import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { IndexComponent } from './index/index.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OrderComponent } from './order/order.component';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    DefaultComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    IndexComponent,
    OrderComponent,
    CartComponent,
    CategoryComponent,
    SidebarComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CarouselModule,
    NgbModule,
    NgxSliderModule
  ],
})
export class DefaultModule {
 
}
