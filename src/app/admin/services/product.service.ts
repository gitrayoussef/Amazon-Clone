import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/interface/category';
import { Discount } from 'src/app/interface/discount';
import { Inventory } from 'src/app/interface/inventory';
import { Login } from 'src/app/interface/login';
import { Product } from 'src/app/interface/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8000';
  private token!: any;
  constructor(private http: HttpClient) {}

  // Products Service
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/api/products`);
  }
  getProduct(id: string | number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/${id}`);
  }
  createProduct(product: any): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post<any>(
      `${this.apiUrl}/api/admin/products/store`,
      product,
      {
        headers: headers,
      }
    );
  }
  // updateProduct(id: string | number, product: any): Observable<any> {
  //   let headers = new HttpHeaders({
  //     Authorization: `Bearer ${localStorage.getItem('token')}`
  //   });
  //   return this.http.put<any>(`${this.apiUrl}/products/${id}`, product, {
  //     headers: headers,
  //   });
  // }
  deleteProduct(id: number): Observable<void> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.delete<void>(`${this.apiUrl}/api/admin/products/${id}`, {
      headers: headers,
    });
  }
  // Gategories Service
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/api/categories`);
  }
  getCategory(id: any): Observable<Category[]> {
    return this.http.get<any>(`${this.apiUrl}/api/categories/${id}`);
  }
  createCategory(category: any): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post<any>(
      `${this.apiUrl}/api/admin/categories/store`,
      category,
      {
        headers: headers,
      }
    );
  }
  updateCategory(id: any, category: any): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.put<Category>(
      `${this.apiUrl}/api/admin/categories/${id}`,
      category,
      {
        headers: headers,
      }
    );
  }
  deleteCategory(id: any): Observable<void> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.delete<void>(`${this.apiUrl}/api/admin/categories/${id}`, {
      headers: headers,
    });
  }
  // Inventories Service
  getInventories(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.apiUrl}/api/Inventory`);
  }
  createInventory(inventory: Inventory): Observable<Inventory> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post<Inventory>(`${this.apiUrl}/api/Inventory`, inventory, {
      headers: headers,
    });
  }
  // Discounts Service
  getDiscounts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/Discount`);
  }
  getDiscount(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/Discount/${id}`);
  }
  createDiscount(discount: any): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post<any>(`${this.apiUrl}/api/Discount`, discount, {
      headers: headers,
    });
  }
  updateDiscount(id: any, discount: any): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.put<any>(`${this.apiUrl}/api/Discount/${id}`, discount, {
      headers: headers,
    });
  }
  deleteDiscount(id: any): Observable<void> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.delete<void>(`${this.apiUrl}/api/Discount/${id}`, {
      headers: headers,
    });
  }

  // admin login
  loginAdmin(user: Login): Observable<Login> {
    return this.http.post<Login>(`${this.apiUrl}/api/admin/login`, user);
  }
}
