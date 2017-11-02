import { Component, OnInit, Input, SimpleChange, OnChanges, Output, EventEmitter } from '@angular/core';
import { User, Role } from '../user.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { LoggerService } from '../../core/logger.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnChanges {

  @Input() user: User = new User(''); // user with empty id
  @Output() onComplete = new EventEmitter<User | undefined>();
  isNew = true; // new user by default
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

  private observer: Observer<User> = {
    next: user => {
      this.complete(user);
    },
    error: error => {
      this.errorMessage = error.toString();
    },
    complete: () => { }
  };

  constructor(
    private service: UserService,
    private fb: FormBuilder,
    private logger: LoggerService,
    private route: ActivatedRoute,
    private roter: Router
  ) {
    this.isNew = !this.user.id;
    for (const role in Role) {
      if (typeof Role[role] === 'number') {
        this.roles.push({ key: +Role[role], value: role });
      }
    }
  }

  ngOnInit() {
    this.buildForm();
    this.route.paramMap
      .map( paramMap => paramMap.get('id') )
      .filter( id => !!id )
      .do( id => this.logger.log(id) )
      .switchMap( id => this.service.findUser(id))
      .do( user => this.logger.log(user) )
      .subscribe( user => {
        this.isNew = false;
        this.user = user;
        this.resetForm();
      },
      error => this.errorMessage = error.toString()
    );
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
      'fname': [this.user.fname, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(24)
      ]],
      'lname': [this.user.lname, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(24)
      ]],
      'password': [this.user.password, [
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{6,20}$')
      ]],
      'role': [this.user.role, [
        Validators.required
      ]]
    });

    this.userForm.statusChanges
      .subscribe(data => this.onStatusChanged(data));

    this.onStatusChanged(); // reset validation messages
  }

  public onSubmit() {
    this.user = this.userForm.getRawValue() as User;
    if (this.isNew) {
      this.service.addUser(this.user)
        .subscribe(this.observer);
    } else {
      this.service.editUser(this.user)
        .subscribe(this.observer);
    }
  }

  resetForm() {
    this.isNew = !this.user.id;
    if (this.userForm) {
      this.userForm.reset(this.user);
    }
  }

  public complete (user?: User) {
    this.onComplete.emit(user);
    // window.location.replace('/');
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
