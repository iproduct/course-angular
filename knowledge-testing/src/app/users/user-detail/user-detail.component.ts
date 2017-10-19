import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { User, Role } from '../user.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'kt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user: User = new User(''); // user with empty id
  @Input() isNewUser = true; // new user by default
  roles: { key: Role, value: string }[] = [];
  userForm: FormGroup;
  errorMessage: string;

  formErrors = {
    'fname': '',
    'lname': '',
    'email': '',
    'password': '',
    'role': ''
  };

  private validationMessages = {
    'fname': {
      'required': 'First name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 40 characters long.'
    },
    'lname': {
      'required': 'Last name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 40 characters long.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Please enter a valid email.',
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password should be between 6 and 20 characters, and should conatain at least one letter and one number.'
    },
    'role': {
      'required': 'Password is required.'
    }
  };

  constructor( private service: UserService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
  }

  public ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    const chng = changes['user'];
    if (chng.currentValue !== chng.previousValue) {
      this.resetForm();
    }
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      'id': [{ value: this.user.id, disabled: true }],
      'email': [this.user.email, [
        Validators.required,
        Validators.email,
      ]],
      // 'fname': [this.user.fname, [
      //   Validators.required,
      //   Validators.minLength(2),
      //   Validators.maxLength(24)
      // ]],
      // 'lname': [this.user.lname, [
      //   Validators.required,
      //   Validators.minLength(2),
      //   Validators.maxLength(24)
      // ]],
      // 'password': [this.user.password, [
      //   Validators.required,
      //   Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{6,20}$')
      // ]],
      // 'role': [this.user.role, [
      //   Validators.required
      // ]]
    });

    this.userForm.statusChanges
      .subscribe(data => this.onStatusChanged(data));

    this.onStatusChanged(); // reset validation messages
  }

  resetForm() {
    this.userForm.reset(this.user);
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
