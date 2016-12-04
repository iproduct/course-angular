/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ReflectiveInjector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

describe('Depenedency Injection Tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [
        BrowserModule,
        FormsModule,
      ],
    });
  });

  it('useExisting injection should work', () => {
    class Greeting {
      salutation = 'Hello';
    }
    class FormalGreeting extends Greeting {
      salutation = 'Greetings';
    }
    const injector = ReflectiveInjector.resolveAndCreate(
      [FormalGreeting, { provide: Greeting, useExisting: FormalGreeting }]);
    expect(injector.get(Greeting).salutation).toEqual('Greetings');
    expect(injector.get(FormalGreeting).salutation).toEqual('Greetings');
    expect(injector.get(FormalGreeting)).toBe(injector.get(Greeting));
  });
});
