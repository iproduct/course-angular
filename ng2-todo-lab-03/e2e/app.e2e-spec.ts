import { Ng2TodoLab03Page } from './app.po';

describe('ng2-todo-lab-03 App', function() {
  let page: Ng2TodoLab03Page;

  beforeEach(() => {
    page = new Ng2TodoLab03Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
