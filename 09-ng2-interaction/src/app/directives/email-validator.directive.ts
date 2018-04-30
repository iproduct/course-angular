import { Directive} from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidatorFn, Validators} from '@angular/forms';

interface Validator<T extends AbstractControl> {
    (c: T): { [error: string]: any };
}

function validateEmail(c: AbstractControl) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    return EMAIL_REGEXP.test(c.value) ? null : {
        validateEmail: {
            valid: false
        }
    };
}

@Directive({
    selector: '[validateEmail][ngControl],[validateEmail][ngModel],[validateEmail][ngFormControl]',
    providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidator, multi: true }]
})
export class EmailValidator {

    validator: Function;

    constructor() {
        this.validator = validateEmail;
    }

    validate(c: AbstractControl) {
        return this.validator(c);
    }
}