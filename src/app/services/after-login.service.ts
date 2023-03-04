import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PreviousRouteService } from './previous-route.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AfterLoginService implements CanActivate {
  value!: boolean;
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private previousRouter: PreviousRouteService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.tokenService.isValid()) {
      this.router.navigateByUrl('/login');
    } 
    return this.tokenService.isValid();
  }
}
