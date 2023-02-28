import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/interface/category';
import { Discount } from 'src/app/interface/discount';
import { Inventory } from 'src/app/interface/inventory';
import { Product } from 'src/app/interface/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8000';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer /* YOUR_TOKEN_HERE */',
  });
  constructor(private http: HttpClient) {}

  // Products Service
  getProduct(id: string | number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/api/products/${id}`);
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
}
