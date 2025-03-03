import { Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { LoginComponent } from './auth/login.component';
import { SignUpComponent } from './sign-up/signup.component';
import { AdminDashboardComponent } from './admin-dashboard/AdminDashboardComponent';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent, 
    // canActivate: [AuthGuard] ,
    data: { requiresAdmin: true } 
  },
  { 
    path: 'user-dashboard', 
    component: UserDashboardComponent, 
    // canActivate: [AuthGuard] 
  },
  { path: '**', redirectTo: '/login' }
];
