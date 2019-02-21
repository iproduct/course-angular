import { SimpleFormModule } from './simple-form.module';

describe('SimpleFormModule', () => {
  let simpleFormModule: SimpleFormModule;

  beforeEach(() => {
    simpleFormModule = new SimpleFormModule();
  });

  it('should create an instance', () => {
    expect(simpleFormModule).toBeTruthy();
  });
});
