/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { Component, Input, OnInit, OnChanges, SimpleChange, HostBinding, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Role, User } from '../user.model';
import { UserService } from '../user.service';
import { Subscription, Observable } from 'rxjs/Rx';
import { slideInDownAnimation } from '../../shared/animations';
import { CanComponentDeactivate } from '../../core/can-deactivate-guard.service';
import { DialogService } from '../../core/dialog.service';
import { shallowEquals } from '../../shared/utils';
import { IdentityType } from '../../shared/shared-types';
import { Store } from '@ngrx/store';

import { UserActions } from '../user.actions';
import { RootState } from '../user.module';

import { Go } from '../../shared/routing.actions';

@Component({
  selector: 'ipt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  animations: [slideInDownAnimation]
})
export class UserDetailComponent implements OnInit, OnDestroy, OnChanges, CanComponentDeactivate {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.position') position = 'absolute';

  public user: User = new User(''); // user with empty id
  public roles: { key: Role, value: string }[] = [];
  public userForm: FormGroup;
  public isNewUser = true; // new user by default
  public errorMessage: string;
  private subscription: Subscription;

  formErrors = {
    'fname': '',
    'lname': '',
    'email': '',
    'password': '',
    'role': ''
  };

  validationMessages = {
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

  constructor(
    private store: Store<RootState>,
    private userActions: UserActions,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {

    // tslint:disable-next-line:prefer-const
    for (let role in Role) {
      if (typeof Role[role] === 'number') {
        this.roles.push({ key: +Role[role], value: role });
      }
    }
  }

  public ngOnInit() {
    this.buildForm();

    this.route.data
      .subscribe((data: { user: User }) => {
        const user = data.user;
        if (user) {
          this.user = user;
          this.isNewUser = false;
          this.resetForm();
        }
      });
  }

  public ngOnDestroy() {
    this.unsubscribe();
  }

  public ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
      const chng = changes['user'];
      if (chng.currentValue !== chng.previousValue) {
        this.resetForm();
      }
  }

  canDeactivate(): Promise<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no user or the user data is not changed
    if (shallowEquals(this.user, this.userForm.getRawValue() as User)) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

  public buildForm(): void {
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
    if (this.isNewUser) {
      this.store.dispatch(this.userActions.addUser(this.user));
    } else {
      this.store.dispatch(this.userActions.editUser(this.user));
    }
    // this.goBack();
  }

  public goBack() {
    this.store.dispatch(new Go({
      path: ['/users'],
    }));
  }

  public resetForm() {
    this.userForm.reset(this.user);
  }

  private unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
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

