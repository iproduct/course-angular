import { ProductsRoutingModule } from '../products-routing.module';

describe('ProductsRoutingModule', () => {
  let productsRoutingModule: ProductsRoutingModule;

  beforeEach(() => {
    productsRoutingModule = new ProductsRoutingModule();
  });

  it('should create an instance', () => {
    expect(productsRoutingModule).toBeTruthy();
  });
});
