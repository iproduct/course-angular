import { NgrxSimple10Page } from './app.po';

describe('ngrx-simple-10 App', function() {
  let page: NgrxSimple10Page;

  beforeEach(() => {
    page = new NgrxSimple10Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
