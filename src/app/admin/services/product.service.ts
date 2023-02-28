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
  private apiUrl = 'http://localhost:3000';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer /* YOUR_TOKEN_HERE */',
  });
  constructor(private http: HttpClient) {}

  // Products Service
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }
  getProduct(id: string | number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/${id}`);
  }
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product, {
      headers: this.headers,
    });
  }
  updateProduct(id: string | number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product, {
      headers: this.headers,
    });
  }
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`);
  }

  filterByProduct(filter: string) {
    return this.http.get(`${this.apiUrl}/products/search/${filter}`);
  }

  filterByCategory(filter: string) {
    return this.http.get(`${this.apiUrl}/products/search/categories/${filter}`);
  }
  // Gategories Service
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }
  getCategory(id: string | number): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories/${id}`);
  }
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/categories`, category, {
      headers: this.headers,
    });
  }
  updateCategory(
    id: string | number,
    category: Category
  ): Observable<Category> {
    return this.http.put<Category>(
      `${this.apiUrl}/categories/${id}`,
      category,
      {
        headers: this.headers,
      }
    );
  }
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/categories/${id}`);
  }
  // Inventories Service
  getInventories(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.apiUrl}/inventories`);
  }
  createInventory(inventory: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(`${this.apiUrl}/inventories`, inventory, {
      headers: this.headers,
    });
  }
  // Discounts Service
  getDiscounts(): Observable<Discount[]> {
    return this.http.get<Discount[]>(`${this.apiUrl}/discounts`);
  }
  getDiscount(id: string | number): Observable<Discount[]> {
    return this.http.get<Discount[]>(`${this.apiUrl}/discounts/${id}`);
  }
  createDiscount(discount: Discount): Observable<Discount> {
    return this.http.post<Discount>(`${this.apiUrl}/discounts`, discount, {
      headers: this.headers,
    });
  }
  updateDiscount(
    id: string | number,
    discount: Discount
  ): Observable<Discount> {
    return this.http.put<Discount>(`${this.apiUrl}/discounts/${id}`, discount, {
      headers: this.headers,
    });
  }
  deleteDiscount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/discounts/${id}`);
  }
}
