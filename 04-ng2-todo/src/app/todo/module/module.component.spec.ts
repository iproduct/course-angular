import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { ModuleComponent } from './module.component';
import { ModuleService } from './shared/module.service';
import { Module } from './shared/module.model';

describe('a module component', () => {
	let component: ModuleComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule],
			providers: [
				{ provide: ModuleService, useClass: MockModuleService },
				ModuleComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ModuleComponent], (ModuleComponent) => {
		component = ModuleComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});

// Mock of the original module service
class MockModuleService extends ModuleService {
	getList(): Observable<any> {
		return Observable.from([ { id: 1, name: 'One'}, { id: 2, name: 'Two'} ]);
	}
}
