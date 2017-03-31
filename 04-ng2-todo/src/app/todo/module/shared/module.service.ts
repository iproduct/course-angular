import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Module } from './module.model';

@Injectable()
export class ModuleService {

	constructor(private http: Http) { }

	getList(): Observable<Module[]> {
		return this.http.get('/api/list').map(res => res.json() as Module[]);
	}
}