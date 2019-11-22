import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { User, Role, Gender } from '../user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { UserService } from '../user.service';
import { MessageService } from 'src/app/core/message.service';
import { shallowEquals } from 'src/app/shared/utils';
import { CanComponentDeactivate } from 'src/app/core/can-deactivate-guard.service';
import { DialogService } from 'src/app/core/dialog.service';
import { AuthService } from 'src/app/auth/auth.service';
import { filter, switchMap, tap } from 'rxjs/operators';
import { LoggerService } from 'src/app/core/logger.service';

@Component({
  selector: 'ws-user-detail-reactive',
  templateUrl: './user-detail-reactive.component.html',
  styleUrls: ['./user-detail-reactive.component.css']
})
export class UserDetailReactiveComponent implements OnInit, OnChanges, CanComponentDeactivate {
  @Input() mode = 'present';
  @Input() user: User = new User(undefined, undefined, undefined);
  @Output() userChange = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();

  title = 'Register as New User';

  userForm: FormGroup;
  isNewUser = true; // new user by default
  isAdmin = false;
  isCanceled = false;
  errorMessage: string;
  private subscription: Subscription;

  roles: { key: Role, value: string }[] = [];
  genders: { key: Gender, value: string }[] = [];

  formErrors = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    role: '',
    avatarUrl: ''
  };

  validationMessages = {
    username: {
      'required': 'Username is required.',
      'pattern': 'Username can contain only letters, digits, and underscore.',
      'minlength': 'Username must be at least 3 characters long.',
      'maxlength': 'Username cannot be more than 24 characters long.'
    },
    firstName: {
      'required': 'First name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 24 characters long.'
    },
    lastName: {
      'required': 'Last name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 24 characters long.'
    },
    email: {
      'required': 'Email is required.',
      'email': 'Please enter a valid email.',
    },
    password: {
      'required': 'Password is required.',
      'pattern': 'Password should be between 8 and 20 characters, and should conatain at least one letter and one number.'
    },
    gender: {
      'required': 'Gender is required.'
    },
    role: {
      'required': 'Password is required.'
    },
    avatarUrl: {
      pattern: 'Image URL should be valid (ex. http://example.com/image/avatar.jpeg).'
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private logger: LoggerService
  ) {
    for (const role in Role) {
      if (typeof Role[role] === 'number') {
        this.roles.push({ key: +Role[role], value: role });
      }
    }
    for (const gender in Gender) {
      if (typeof Gender[gender] === 'number') {
        this.genders.push({ key: +Gender[gender], value: gender });
      }
    }
  }

  ngOnInit() {
    // this.route.params.pipe(
    //   filter(params => params['userId']),
    //   switchMap(params => this.userService.findById(params['userId'])),
    //   tap(user => console.log(user))
    // ).subscribe(
    //   user => {
    //     this.user = user;
    //     this.isNewUser = false;
    //     this.resetUser();
    //   },
    //   err => this.messageService.error(err)
    // );

    this.route.data
    .subscribe(
      (data: { user: User, title?: string, mode?: string }) => {
        this.title = data.title || this.title;
        this.mode = data.mode || this.mode;
        const user = data.user;
        if (user) {
          this.user = user;
          this.isNewUser = false;
          this.resetUser();
        }
      },
      err => this.messageService.error(err)
    );

    this.authService.loggedIn.subscribe(
      authResult => {
        this.logger.log(authResult);
        this.isAdmin = authResult && authResult.user.role === Role.ADMIN;
      });

    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user && changes.user.currentValue !== changes.user.previousValue) {
      this.resetUser();
    }
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      id: {value: this.user.id, disabled: true},
      username: [
        this.user.username,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(24),
          Validators.pattern(/^\w{3,24}$/)
        ]
      ],
      email: [
        this.user.email,
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        this.user.password,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{6,20}$/)
        ]
      ],
      firstName: [
        this.user.firstName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(24)
        ]
      ],
      lastName: [
        this.user.lastName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      gender: [this.user.gender, [
        Validators.required
      ]],
      role: [this.user.role || Role.CUSTOMER, [
        Validators.required
      ]],
      avatarUrl: [
        this.user.avatarUrl,
        [
          Validators.pattern(/^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
        ]
      ],
    });
    this.userForm.statusChanges.subscribe( () => this.onStatusChanged() );
  }

  resetUser() {
    if (this.userForm) {
      this.userForm.reset(this.user);
    }
  }

  submitUser() {
    this.user = this.userForm.getRawValue();
    this.userChange.emit(this.user);
    if (this.isNewUser) {
      if (this.mode === 'register') {
        this.authService.register(this.user).subscribe(
          u => {
            this.messageService.success(`Successfully registered user: ${u.username}`);
            this.router.navigate(['/login']);
          },
          err => this.messageService.error(err)
        );
      } else {
        this.userService.create(this.user).subscribe(
          u => {
            this.messageService.success(`Successfully added user: ${u.username}`);
            this.router.navigate(['/users'], {queryParams: {refresh: true}});
          },
          err => this.messageService.error(err)
        );
      }
    } else {
      this.userService.update(this.user).subscribe(
        u => {
          this.messageService.success(`Successfully updated user: ${u.username}`);
          this.router.navigate(['/users'], {queryParams: {refresh: true}});
        },
        err => this.messageService.error(err)
      );
    }
    // this.goBack();
  }

  private onStatusChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && (control.dirty || control.touched) && control.invalid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  cancelUser() {
    this.isCanceled = true;
    this.cancel.emit();
    this.router.navigate(['/users']);
  }

  getAvatarUrl() {
    return this.userForm.value.avatarUrl ? this.userForm.value.avatarUrl :
    this.userForm.value.gender === Gender.FEMALE ? 'assets/img/female-avatar.jpg' : 'assets/img/male-avatar.png';
  }

  public canDeactivate(): Observable<boolean> | boolean {
    // Allow navigation if no user or the user data is not changed
    // tslint:disable-next-line:prefer-const
    let rawFormUser = this.userForm.getRawValue() as User;
    delete rawFormUser.password;
    if (this.isCanceled || shallowEquals(this.user, rawFormUser)) {
      return true;
    }
    // Otherwise ask the user to confirm loosing changes using the dialog service
    return this.dialogService.confirm('Discard changes?');
  }


  getRoleName(role: Role) {
    return Role[role];
  }
}
