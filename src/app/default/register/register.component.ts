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
import { Register } from 'src/app/interface/register';
import { RegisterService } from 'src/app/services/register.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  isSubmitted = false;
  user!: Register;
  selectedActiveOption: boolean = true;
  successMessage: any;
  errorMessage: any;
  constructor(
    private registerService: RegisterService,
    public fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router,
    private tokenService: TokenService
  ) {}
  register = new FormGroup({
    first_name: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(3),
    ]),
    last_name: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$'
      ),
    ]),
    confirm_password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$'
      ),
    ]),
    gender: new FormControl('male', [
      Validators.required,
      Validators.pattern('female|male'),
    ]),
  });
  get fnameValue() {
    return this.register.controls['first_name'].value;
  }
  get lnameValue() {
    return this.register.controls['last_name'].value;
  }
  get emailValid() {
    if (this.register.controls['email'].value === '') {
      return 'empty';
    } else {
      return this.register.controls['email'].value?.match(
        '[a-zA-Z0-9]+@+[a-z]*.[a-z]'
      );
    }
  }
  get emailValue() {
    return this.register.controls['email'].value;
  }
  get passwordValid() {
    if (this.register.controls['password'].value === '') {
      return 'empty';
    } else {
      return this.register.controls['password'].value?.match(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$'
      );
    }
  }
  get confirmPasswordValid() {
    if (this.register.controls['confirm_password'].value === '') {
      return 'empty';
    } else {
      return (
        this.register.controls['confirm_password']?.value ===
        this.register.controls['password']?.value
      );
    }
  }
  get genderValue() {
    return this.register.controls['gender'].value;
  }

  radioButtonChangeHandler(event: any) {
    let value = event.target.value;
    if (value === 'male') {
      this.selectedActiveOption = true;
    } else if (value === 'female') {
      this.selectedActiveOption = false;
    }
  }
  onSubmit(): void {
    if (!this.register.valid) {
      this.isSubmitted = true;
    }
    if (this.register.valid) {
      const user: any = new FormData();
      user.append('first_name', this.register.controls['first_name']?.value);
      user.append('last_name', this.register.controls['last_name']?.value);
      user.append('email', this.register.controls['email']?.value);
      user.append('password', this.register.controls['password']?.value);
      user.append('gender', this.register.controls['gender']?.value);
      const formDataObj: any = Object.fromEntries(user.entries());
      this.registerService.register(formDataObj).subscribe({
        next: (response: any) => {
          this.tokenService.set(response['token']);
          this.successMessage = `Welcome ${this.register.controls['first_name']?.value}, Your Account created successfully! `;
          this.router.navigate(['login']);
        },
        error: (error: any) => {
          this.errorMessage = `OPPS!! ${error.error.message} `;
        },
      });
    }
  }
}
