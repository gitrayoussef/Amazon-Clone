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

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  isSubmitted = false;
  user!: any;
  successMessage: any;
  errorMessage: any;
  constructor(
    private loginService: LoginService,
    public fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router
  ) {}
  forgetPassword = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get emailValid() {
    if (this.forgetPassword.controls['email'].value === '') {
      return 'empty';
    } else {
      return this.forgetPassword.controls['email'].value?.match(
        '[a-zA-Z0-9]+@+[a-z]*.[a-z]'
      );
    }
  }
  get emailValue() {
    return this.forgetPassword.controls['email'].value;
  }
  onSubmit(): void {
    if (!this.forgetPassword.valid) {
      this.isSubmitted = true;
    }
    if (this.forgetPassword.valid) {
      const user: any = new FormData();
      user.append('email', this.forgetPassword.controls['email']?.value);
      const formDataObj: any = Object.fromEntries(user.entries());
      this.loginService.forgetPassword(formDataObj).subscribe({
        next: (response: any) => {
          this.successMessage = `Welcome , Your reset password was sent to your email successfully! `;

          this.router.navigate(['reset-password']);
        },
        error: (error: any) => {
          this.errorMessage = `OPPS!! ${error.error.error} email or password may be wrong `;
        },
      });
    }
  }
}
