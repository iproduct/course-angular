import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Logger } from './common/logger.service';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [FormsModule],
      providers: [Logger ],
      declarations: [AppComponent]
    });
  });
  it ('should work', () => {
    let fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
  });
});
