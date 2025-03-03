import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Get the role from localStorage
    const role = localStorage.getItem('role');
    console.log('AuthGuard - Current role:', role);

    // First check if the user is authenticated at all
    if (!role) {
      console.log('No role found, redirecting to login');
      this.router.navigate(['/login']);
      return false;
    }

    // // Check if this route requires admin access
    // if (route.data['requiresAdmin'] && role !== 'admin') {
    //   console.log('User role is not admin, redirecting to user dashboard');
    //   this.router.navigate(['/user-dashboard']);
    //   return false;
    // }

    // If user is authenticated and has appropriate role, allow access
    console.log('User authenticated with correct role, allowing navigation');
    return true;
  }
}