import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class AntiAuthGuard implements CanActivate {

  constructor(private router: Router, private commonServe: CommonService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {
    if (this.commonServe.UserStatus()) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }

}
