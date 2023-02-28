import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { __values } from 'tslib';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  isSubmitted = false;
  user!: any;
  successMessage: any;
  errorMessage: any;
  constructor(
    private loginService: LoginService,
    public fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService
  ) {}
  resetPassword = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
  });

  get emailValid() {
    if (this.resetPassword.controls['email'].value === '') {
      return 'empty';
    } else {
      return this.resetPassword.controls['email'].value?.match(
        '[a-zA-Z0-9]+@+[a-z]*.[a-z]'
      );
    }
  }
  get passwordValid() {
    if (this.resetPassword.controls['password'].value === '') {
      return 'empty';
    } else {
      return this.resetPassword.controls['password'].value?.match(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$'
      );
    }
  }
  get emailValue() {
    return this.resetPassword.controls['email'].value;
  }
  get codeValid() {
    return this.resetPassword.controls['code'].valid;
  }

  onSubmit(): void {
    if (!this.resetPassword.valid) {
      this.isSubmitted = true;
    }
    if (this.resetPassword.valid) {
      const user: any = new FormData();
      user.append('email', this.resetPassword.controls['email']?.value);
      user.append('password', this.resetPassword.controls['password']?.value);
      user.append('otp', this.resetPassword.controls['code']?.value);
      const formDataObj: any = Object.fromEntries(user.entries());
      this.loginService.resetPassword(formDataObj).subscribe({
        next: (response: any) => {
          this.successMessage = `Welcome , Your password have been updated successfully! `;
          this.router.navigate(['login']);
        },
        error: (error: any) => {
          this.errorMessage = `OPPS!! ${error.error.message}`;
        },
      });
    }
  }
}
