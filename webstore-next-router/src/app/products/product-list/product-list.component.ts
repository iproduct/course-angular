import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { refreshDescendantViews } from '@angular/core/src/render3/instructions';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product;
  selectedMode: string;

  constructor(private service: ProductService, private messageService: MessageService) { }

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    this.products = await this.service.find().toPromise();
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  selectMode(mode: string) {
    this.selectedMode = mode;
  }

  handleProductChange(product: Product) {
    if (product.id) {
       this.service.update(product).subscribe(
        p => {
          this.upsertProduct(p);
          this.messageService.success(`Successfully updated product: ${p.name}`);
        },
        err => this.messageService.error(err)
      );
    } else {
      this.service.create(product).subscribe(
        p => {
          this.upsertProduct(p);
          this.messageService.success(`Successfully added product: ${p.name}`);
        },
        err => this.messageService.error(err)
      );
    }
    this.selectedProduct = undefined;
  }

  addProduct() {
    this.selectedProduct = new Product(undefined, undefined);
    this.selectedMode = 'create';
  }

  productCanceled() {
    this.selectedProduct = undefined;
  }

  deleteProduct(product: Product) {
    this.service.delete(product.id).subscribe(
      p => {
          this.removeProduct(p);
          this.messageService.success(`Successfully deleted user: ${p.name}`);
        },
        err => this.messageService.error(err)
    );
  }

  private upsertProduct(product: Product): void {
    if (!product) return;
    const index = this.products.findIndex(u => u.id === product.id);
    if (index >= 0) {
      this.products[index] = product;
    } else {
      this.products.push(product);
    }
  }

  private removeProduct(product: Product): void {
    if (!product) return;
    const index = this.products.findIndex(u => u.id === product.id);
    if (index >= 0) {
      this.products.splice(index, 1);
    }
  }

}
