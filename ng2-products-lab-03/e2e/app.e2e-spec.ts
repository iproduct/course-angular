import { Ng2ProductsLab03Page } from './app.po';

describe('ng2-products-lab-03 App', function() {
  let page: Ng2ProductsLab03Page;

  beforeEach(() => {
    page = new Ng2ProductsLab03Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
