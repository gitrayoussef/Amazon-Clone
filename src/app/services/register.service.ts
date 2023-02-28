import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../interface/register';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:8000';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer /* YOUR_TOKEN_HERE */',
  });
  constructor(private http: HttpClient) {}
  register(user: Register): Observable<Register> {
    return this.http.post<Register>(`${this.apiUrl}/api/register`, user, {
      headers: this.headers,
    });
  }
}
