import { Injectable } from "@angular/core";
import { BackendService } from "../core/backend.service";
import { Product } from "./product.model";
import { KeyType } from "../shared/common-types";

@Injectable()
export class ProductService {
  constructor(private backend: BackendService) {}

  findAll() {
    return this.backend.findAll(Product);
  }

  find(id: KeyType) {
    return this.backend.find(Product, id);
  }

  add(product: Product) {
    return this.backend.add(Product, product);
  }

  update(product: Product) {
    return this.backend.update(Product, product);
  }

  remove(id: KeyType) {
    return this.backend.remove(Product, id);
  }
}
