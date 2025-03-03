import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7247/api/User';
  // private apiUrl = ' https://translation-oksx.onrender.com';
 

  constructor(private http: HttpClient) {}

  // SignUp method to register new users
  signUp(username: string,fullName:string, email: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username,fullName, email, password, role });
  }

  // Login method to authenticate users
  login(username: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password, role }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
        }
      })
    );
  }

  // Logout function to clear stored authentication details
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
