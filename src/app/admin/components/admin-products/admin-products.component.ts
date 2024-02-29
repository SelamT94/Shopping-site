import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Observable, Subscriber, Subscription,of } from 'rxjs';
import { Product } from '../../../shared/models/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  displayedColumns: string[] = ['title', 'price', 'edit'];
  

  products: Product[];
  filteredProducts: any[];
  subscription : Subscription;
  dataSource: MatTableDataSource<Product>;
 

  @ViewChild (MatPaginator) paginator!: MatPaginator;
  @ViewChild (MatSort)sort!: MatSort;



  constructor (private productService: ProductService) {
    this.dataSource = new MatTableDataSource<Product>;  
    
    this.filteredProducts = [];
    this.products = []; 
    this.subscription = this.productService.getAll().subscribe(products => {  //immediatly laods the products 
      this.filteredProducts = products; 
      
    });
  }

   applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter((p: { title: string; }) => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe((products: Product[]) => {
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
