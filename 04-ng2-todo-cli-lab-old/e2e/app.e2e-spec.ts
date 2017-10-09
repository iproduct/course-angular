import { Ng2TodoCliLabPage } from './app.po';

describe('ng2-todo-cli-lab App', () => {
  let page: Ng2TodoCliLabPage;

  beforeEach(() => {
    page = new Ng2TodoCliLabPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
