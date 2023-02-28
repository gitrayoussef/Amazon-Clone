import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authService.authStatus.subscribe((value) => (this.loggedIn = value));
  }

  logout(event: any) {
    this.tokenService.delete();
    this.authService.changeAuthStatus(false);
    this.tokenService.validLoggedIn=false;
    this.router.navigateByUrl('/login');
  }
}
