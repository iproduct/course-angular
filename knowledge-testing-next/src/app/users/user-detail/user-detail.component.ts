import { Component, OnInit, Input, SimpleChange, OnChanges, Output, EventEmitter, HostBinding } from '@angular/core';
import { User, Role } from '../user.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute,   Router,   Params,   CanDeactivate } from '@angular/router';
import { slideInDownAnimation } from '../../shared/animations';
import { LoggerService } from '../../core/logger.service';
import { shallowEquals } from '../../shared/utils';
import { DialogService } from '../../core/dialog.service';

@Component({
  selector: 'kt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  animations: [slideInDownAnimation]
})
export class UserDetailComponent implements OnInit, OnChanges, CanDeactivate<UserDetailComponent> {
  @HostBinding('@routeAnimation') routeAnimation = true;

  @Input() user: User = new User(''); // user with empty id
  @Output() onComplete = new EventEmitter<User | undefined>();
  title = '';
  isNew = true; // new user by default
  roles: { key: Role, value: string }[] = [];
  userForm: FormGroup;
  errorMessage: string;
  private isCanceled = false;

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
      private logger: LoggerService,
      private dialogService: DialogService,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router) {
    this.isNew = !this.user.id;
    for (const role in Role) {
      if (typeof Role[role] === 'number') {
        this.roles.push({ key: +Role[role], value: role });
      }
    }
  }

  ngOnInit() {
    this.buildForm();
    // this.route.paramMap
    //   .map(paramMap => paramMap.get('id'))
    //   .filter(id => !!id)
    //   .switchMap(id => this.service.findUser(id))
    //   .subscribe(user => {
    //       this.isNew = false;
    //       this.user = user;
    //       this.resetForm();
    //     },
    //     error => this.errorMessage = error.toString()
    //   );

    this.route.data
      .subscribe(({ title, user }) => {
        this.title = title;
        if (user) {
          this.user = user;
          this.resetForm();
        }
      },
      error => this.errorMessage = error.toString()
    );

    this.route.data.do(data => this.logger.log(JSON.stringify(data)))
      .forEach((data: Params) => {
        this.title = data['title'];
      });
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

  public cancel() {
    this.isCanceled = true;
    this.complete(this.user);
  }

  public complete (user?: User) {
    this.router.navigate(['..'], { relativeTo: this.route });
    // this.onComplete.emit(user);
    // window.location.replace('/');
  }

  public canDeactivate(): Promise<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no user or the user data is not changed
    if (this.isCanceled || shallowEquals(this.user, this.userForm.getRawValue() as User)) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
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
