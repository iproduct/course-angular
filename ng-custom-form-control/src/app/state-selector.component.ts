import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {states, State} from './states';

@Component({
  selector: 'state-selector',
   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StateSelectorComponent),
      multi: true
    }
  ],
  template: `
      <select [name]="name" [(ngModel)]="value">
          <option *ngFor="let state of stateList" [value]="state.abbreviation"> 
            {{state.name}}
          </option>
      </select>
  `
})
export class StateSelectorComponent implements ControlValueAccessor  {

  @Input()
  name: string;
  @Input('value')
  val: string;

  stateList: State[] = states;
  onChange: any = () => { };
  onTouched: any = () => { };

  get value() {
    return this.val;
  }

  set value(val) {
    this.val = val;
    this.onChange(val);
    this.onTouched();
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) { 
    this.onTouched = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }
}
