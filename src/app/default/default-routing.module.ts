import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfterLoginService } from '../services/after-login.service';
import { BeforeLoginService } from '../services/before-login.service';
import { DefaultComponent } from './default.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

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
        path: '**',
        component: IndexComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultRoutingModule {}
