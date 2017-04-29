import { LifecycleHooksPage } from './app.po';

describe('lifecycle-hooks App', () => {
  let page: LifecycleHooksPage;

  beforeEach(() => {
    page = new LifecycleHooksPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
