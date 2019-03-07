  import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
  import { User, Role, Gender } from '../user.model';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, filter } from 'rxjs/operators';
import { MessageService } from 'src/app/core/message.service';

  @Component({
    selector: 'ws-user-detail-reactive',
    templateUrl: './user-detail-reactive.component.html',
    styleUrls: ['./user-detail-reactive.component.css']
  })
  export class UserDetailReactiveComponent implements OnInit, OnChanges {
    @Input() mode = 'present';
    @Input() user: User = new User(undefined, undefined, undefined);
    @Output() userChange = new EventEmitter<User>();
    @Output() cancel = new EventEmitter<void>();

    title = 'User Details';
    userForm: FormGroup;
    isAdmin = true;
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
        'pattern': 'Password should be between 6 and 20 characters, and should conatain at least one letter and one number.'
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
      private fb: FormBuilder,
      private service: UserService,
      private router: Router,
      private route: ActivatedRoute,
      private messageService: MessageService,
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
      this.route.params.pipe(
        filter(params => !!params['userId']),
        switchMap(params => this.service.findById(params['userId']))
      ).subscribe( user => {
        this.user = user;
        this.resetUser();
      });
      this.route.data.subscribe(({title, mode}) => {
        this.title = title;
        this.mode = mode;
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
            Validators.minLength(6),
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
      if (this.mode === 'create') {
          this.service.create(this.user).subscribe(
            u => {
              this.messageService.success(`Successfully added user: ${u.username}`);
              this.router.navigate(['/users'], {queryParams: {refresh: true}});
            },
            err => this.messageService.error(err)
          );
      } else {
        this.service.update(this.user).subscribe(
          u => {
            this.messageService.success(`Successfully updated user: ${u.username}`);
            this.router.navigate(['/users'], {queryParams: {refresh: true}});
          },
          err => this.messageService.error(err)
        );
      }

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
      this.cancel.emit();
      this.router.navigate(['/users']);
    }

    getAvatarUrl() {
      return this.userForm.value.avatarUrl ? this.userForm.value.avatarUrl :
      this.userForm.value.gender === Gender.FEMALE ? 'assets/img/female-avatar.jpg' : 'assets/img/male-avatar.png';
    }

  getRoleName(role: Role) {
    return Role[role];
  }
}
