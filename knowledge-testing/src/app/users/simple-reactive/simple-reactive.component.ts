import { Component, OnInit, Input, SimpleChange, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'kt-simple-reactive',
  templateUrl: './simple-reactive.component.html',
  styleUrls: ['./simple-reactive.component.css']
})
export class SimpleReactiveComponent implements OnInit, OnChanges {
  @Input() user: User = new User('');
  @Input() isNew = true;

  formErrors = {
    'email': ''
  };

  private validationMessages = {
    email: {
      required: 'Email is required.',
      email: 'Please enter a valid email.'
    }
  };

  userForm: FormGroup;
  constructor(private fb: FormBuilder, private service: UserService) { }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges ): void {
    const chng: SimpleChange = changes['user'];
    if (chng.currentValue !== chng.previousValue) {
      this.resetForm();
    }
  }

  resetForm() {
    if (this.userForm) {
      this.userForm.reset(this.user);
    }
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      'email': [this.user.email, [Validators.required, Validators.email]]
    });
    this.userForm.statusChanges.subscribe( data => this.onStatusChanged(data));
  }

  onSubmit(): void {
    this.user = this.userForm.getRawValue() as User;
    if (this.isNew)  {
      this.service.addUser(this.user);
    } else {
      this.service.editUser(this.user);
    }
  }

  private onStatusChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}
