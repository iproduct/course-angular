import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  AbstractControl, NG_VALIDATORS, Validator, ValidatorFn,
  AsyncValidatorFn, Validators, ValidationErrors
} from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const name = control.value;
    const no = nameRe.test(name);
    return no ? { 'forbiddenName': {invalidValue: name} } : null;
  };
}

export function nameTakenValidator(name: string): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors> => {
    // let pending: number;
    // if (control.touched) {
      return new Promise<ValidationErrors>((resolve, reject) => {
        setTimeout(() => {
          if (name && control.value && control.value.toLowerCase() === name.toLowerCase()) {
            resolve({ 'nameTaken': {invalidValue: control.value} });
          } else {
            resolve(null);
          }
        }, 2000);
      });
      // .then((validationResult: ValidationErrors) => {
      //     control.markAsUntouched({onlySelf: true});
      //     return validationResult;
      // });
    // } else {
    //   return Promise.resolve(null);
    // }
  };
}

@Directive({
  selector: '[forbiddenName]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true }]
})
export class ForbiddenValidatorDirective implements Validator, OnChanges {
  @Input() private forbiddenName: string;
  private valFn = Validators.nullValidator;

  public ngOnChanges(changes: SimpleChanges): void {
    const change = changes['forbiddenName'];
    if (change) {
      const val: string | RegExp = change.currentValue;
      const re = val instanceof RegExp ? val : new RegExp(val, 'i');
      this.valFn = forbiddenNameValidator(re);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  public validate(control: AbstractControl): { [key: string]: any } {
    return this.valFn(control);
  }
}

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
