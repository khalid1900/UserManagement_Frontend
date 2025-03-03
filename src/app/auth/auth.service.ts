import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7247/api/User';

  constructor(private http: HttpClient) {}

  login(username: string, password: string,role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password, role }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
        }
      })
    );
  }

  signup(username: string, email: string, password: string, fullname:string,role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username,fullname, email, password, role });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
