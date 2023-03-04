import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Category } from 'src/app/interface/category';
import { Discount } from 'src/app/interface/discount';
import { Inventory } from 'src/app/interface/inventory';
import { Product } from 'src/app/interface/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8000';
  subjectNotifier: Subject<any> = new Subject<any>();
  cartNotifier: Subject<any> = new Subject<any>();
  private _refreshComp = new Subject<void>();
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer /* YOUR_TOKEN_HERE */',
  });
  constructor(private http: HttpClient) {}
  notifyAboutChange(data: any) {
    this.subjectNotifier.next(data);
  }
  notifyAboutCartChange(data: any) {
    this.cartNotifier.next(data);
  }
  // Products Service
  getProduct(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/products/${id}`);
  }
  filterByProduct(filter: string) {
    return this.http.get(`${this.apiUrl}/api/products/search/${filter}`);
  }

  filterByCategory(filter: string) {
    return this.http.get(
      `${this.apiUrl}/api/products/search/categories/${filter}`
    );
  }
  // Gategories Service
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/api/categories`);
  }
  getCategory(id: string | number): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/api/categories/${id}`);
  }
  // Inventories Service
  getInventories(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.apiUrl}/api/Inventory`);
  }
  // Discounts Service
  getDiscounts(): Observable<Discount[]> {
    return this.http.get<Discount[]>(`${this.apiUrl}/api/Discount`);
  }
  getDiscount(id: string | number): Observable<Discount[]> {
    return this.http.get<Discount[]>(`${this.apiUrl}/api/Discount/${id}`);
  }
  // Reviews
  getReviews(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/reviews`);
  }
  createReviews(review: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/reviews/store`, review);
  }
  // users
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/allUsers`);
  }
  // carts
  createCarts(cart: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/cart/store`, cart);
  }
  getCarts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/cart`);
  }
}
