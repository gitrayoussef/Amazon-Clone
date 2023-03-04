import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../interface/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public user: any;
  public session: any;
  private apiUrl = 'http://localhost:8000';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer '+localStorage.getItem('token'),
  });
  constructor(private http: HttpClient) {}
  login(user: Login): Observable<Login> {
    return this.http.post<Login>(`${this.apiUrl}/api/login`, user, {
      headers: this.headers,
    });
  }
  forgetPassword(user: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/api/password/forget-password`,
      user,
      {
        headers: this.headers,
      }
    );
  }
  resetPassword(user: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/api/password/reset-password`,
      user,
      {
        headers: this.headers,
      }
    );
  }
  loginWithGoogle(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/google/redirect`, {
      withCredentials: false,
    });
  }
  loginWithFacebook(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/facebook/redirect`);
  }
  startSession(userSession:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/shopping/store`, userSession);
  }
}
