import { RxDemoModule } from './rx-demo.module';

describe('RxDemoModule', () => {
  let rxDemoModule: RxDemoModule;

  beforeEach(() => {
    rxDemoModule = new RxDemoModule();
  });

  it('should create an instance', () => {
    expect(rxDemoModule).toBeTruthy();
  });
});
