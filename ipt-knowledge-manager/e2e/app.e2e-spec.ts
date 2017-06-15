import { IptKnowledgeTestingPage } from './app.po';

describe('ipt-knowledge-testing App', () => {
  let page: IptKnowledgeTestingPage;

  beforeEach(() => {
    page = new IptKnowledgeTestingPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
