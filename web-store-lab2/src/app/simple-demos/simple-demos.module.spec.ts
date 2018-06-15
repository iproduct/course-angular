import { SimpleDemosModule } from './simple-demos.module';

describe('SimpleDemosModule', () => {
  let simpleDemosModule: SimpleDemosModule;

  beforeEach(() => {
    simpleDemosModule = new SimpleDemosModule();
  });

  it('should create an instance', () => {
    expect(simpleDemosModule).toBeTruthy();
  });
});
