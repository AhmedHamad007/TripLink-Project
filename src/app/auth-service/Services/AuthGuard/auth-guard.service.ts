import { Injectable } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.authService.userValue;
    const expectedRole = route.data['role'] || '';

    if (user && user.role && user.role === expectedRole) {
      return true;
    }
    console.log(`Auth guard: User role '${user?.role}' doesn't match expected role '${expectedRole}'`);
    this.router.navigate(['/login']);
    return false;
  }
}
