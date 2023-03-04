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
import { Login } from 'src/app/interface/login';
import { PreviousRouteService } from 'src/app/services/previous-route.service';

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
    private loginService: LoginService,
    public fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService,
    private previousRouteService: PreviousRouteService
  ) {}
  login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get emailValid() {
    if (this.login.controls['email'].value === '') {
      return 'empty';
    } else {
      return this.login.controls['email'].value?.match(
        '[a-zA-Z0-9]+@+[a-z]*.[a-z]'
      );
    }
  }
  get emailValue() {
    return this.login.controls['email'].value;
  }
  get passwordValid() {
    return this.login.controls['password'].valid;
  }

  onSubmit(): void {
    if (!this.login.valid) {
      this.isSubmitted = true;
    }
    if (this.login.valid) {
      const user: any = new FormData();
      user.append('email', this.login.controls['email']?.value);
      user.append('password', this.login.controls['password']?.value);
      const formDataObj: any = Object.fromEntries(user.entries());
      this.loginService.login(formDataObj).subscribe({
        next: (response: any) => {
          this.tokenService.set(response['token']);
          this.authService.changeAuthStatus(true);
          this.loginService.user = response;
          const sesssion :any = new FormData();
          sesssion.append('user_id',response['user'].id);
          sesssion.append('total',0);
          const formDataObj: any = Object.fromEntries(sesssion.entries());
          this.loginService.startSession(formDataObj).subscribe((res: any) => {
            this.loginService.session = res['data'];
          });
          this.successMessage = `Welcome , Your Account created successfully! `;
          if (
            this.previousRouteService.getPreviousUrl() &&
            this.previousRouteService.getPreviousUrl() != '/login'
          ) {
            this.router.navigateByUrl(
              '/' + this.previousRouteService.getPreviousUrl()
            );
          } else {
            this.router.navigateByUrl('/home');
          }
        },
        error: (error: any) => {
          this.errorMessage = `OPPS!! ${error.error.error} email or password may be wrong `;
        },
      });
    }
  }

  loginGoogle(): void {
    this.loginService.loginWithGoogle().subscribe({
      next: (response: any) => {
        this.tokenService.set(response['token']);
        this.authService.changeAuthStatus(true);
        this.router.navigate(['home']);
      },
      error: (error: any) => {
        this.errorMessage = `OPPS!! Something went wrong`;
      },
    });
  }
  loginFacebook(): void {
    this.loginService.loginWithFacebook().subscribe({
      next: (response: any) => {
        this.tokenService.set(response['token']);
        this.authService.changeAuthStatus(true);
        this.router.navigate(['home']);
      },
      error: (error: any) => {
        this.errorMessage = `OPPS!! Something went wrong`;
      },
    });
  }
}
