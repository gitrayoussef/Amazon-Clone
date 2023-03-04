import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public loggedIn!: boolean;
  public categories: any = [];
  public filteredCategories: any = [];
  public cartItems:any;
  notifierSubscription: Subscription =
  this.productService.cartNotifier.subscribe((notified) => {
   this.cartItems = notified;
   console.log(this.cartItems);
  console.log(notified);
  
   
  });

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private productService: ProductService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authService.authStatus.subscribe((value) => (this.loggedIn = value));
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
    }
    this.onGetCategories();
  }

  logout(event: any) {
    this.tokenService.delete();
    this.authService.changeAuthStatus(false);
    this.tokenService.validLoggedIn = false;
    this.router.navigateByUrl('/login');
  }

  onGetCategories(): void {
    this.productService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response['data'];
        this.filteredCategories = response['data'];
      },
      error: (error: any) => {
        console.log(error.message);
      },
    });
  }

  valueSelected(categoryId: any, categoryName: any) {
    this.router.navigateByUrl(
      `/categories/${categoryId}/${categoryName}/page/1`
    );
    this.productService.notifyAboutChange({ categoryId, categoryName });
  }

  
}
