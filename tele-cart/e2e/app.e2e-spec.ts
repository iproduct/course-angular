import { TeleCartPage } from './app.po';

describe('tele-cart App', () => {
  let page: TeleCartPage;

  beforeEach(() => {
    page = new TeleCartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
