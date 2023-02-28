import { Component, OnInit } from '@angular/core';
import { Product } from '../interface/product';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  // private product: Product = 
constructor(private productService: ProductService){}

ngOnInit(): void {
  // this.onUpdateProduct();
  //  this.onGetProducts(); 
  //  this.onDeleteProduct();
  //  this.onGetProduct(); 
  // this.onCreateProduct()
}

// onGetProducts(): void {
//   this.productService.getProducts().subscribe(
//     (response) => console.log(response),
//     (error: any) => console.log(error),
//     () => console.log('Done getting products')
//   );
// }
// onGetProduct(): void {
//   this.productService.getProduct().subscribe(
//     (response) => console.log(response),
//     (error: any) => console.log(error),
//     () => console.log('Done getting product')
//   );
// }
// onCreateProduct(): void {
//   this.productService.createProduct(this.product).subscribe(
//     (response) => console.log(response),
//     (error: any) => console.log(error),
//     () => console.log('Done Creating product')
//   );
// }
// onUpdateProduct(): void {
//   this.productService.updateProduct(this.product).subscribe(
//     (response) => console.log(response),
//     (error: any) => console.log(error),
//     () => console.log('Done updating product')
//   );
// }
// onDeleteProduct(): void {
//   this.productService.deleteProduct(5).subscribe(
//     (response) => console.log(response),
//     (error: any) => console.log(error),
//     () => console.log('Done deleting product')
//   );
// }
}
