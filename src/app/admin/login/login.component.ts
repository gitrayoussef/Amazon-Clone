import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/interface/login';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isSubmitted = false;
  user!: Login;
  successMessage: any;
  errorMessage: any;
  constructor(
    private productService: ProductService,
    private tokenService: TokenService,
    private authService: AuthService,
    public fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router,
  ) {}
  loginAdmin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  onSubmit(): void {
    const user: any = new FormData();
    user.append('email', this.loginAdmin.controls['email']?.value);
    user.append('password', this.loginAdmin.controls['password']?.value);
    const formDataObj: any = Object.fromEntries(user.entries());
    this.productService.loginAdmin(formDataObj).subscribe({
      next: (response: any) => {
        this.tokenService.set(response['token']);
        this.authService.changeAuthStatus(true);
        this.toaster.success(
          'Product have been created successfully',
          'Great Job!',
          {
            timeOut: 3000,
          }
        );
        this.router.navigate(['/admin/products']);
      },
      error: (error: any) => {
        this.toaster.error(error.message, 'OOPS!', {
          timeOut: 3000,
        });
      },
    });
  }
}
