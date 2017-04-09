import { ReactiveFormPage } from './app.po';

describe('reactive-form App', () => {
  let page: ReactiveFormPage;

  beforeEach(() => {
    page = new ReactiveFormPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
