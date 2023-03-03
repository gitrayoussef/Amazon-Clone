import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  private categoryId = 0;
  public categoryName = '';
  constructor(
    private productsService: ProductService,
    private myctivated: ActivatedRoute,
    private Location:Location,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.categoryId = this.myctivated.snapshot.params['id'];
    this.categoryName = this.myctivated.snapshot.params['categoryName'];
  }

}
