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
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Test, License, Difficulty, IQuestion } from '../test.model';
import { TestService } from '../test.service';
import { Subscription, Observable } from 'rxjs/Rx';
import { slideInDownAnimation } from '../../shared/animations';
import { CanComponentDeactivate } from '../../core/can-deactivate-guard.service';
import { DialogService } from '../../core/dialog.service';
import { shallowEquals } from '../../shared/utils';
import { IdentityType } from '../../shared/shared-types';
import { Store } from '@ngrx/store';
import { go, replace, search, show, back, forward } from '@ngrx/router-store';
import { TestActions } from '../test.actions';
import { RootState } from '../test.module';

@Component({
  selector: 'ipt-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.css'],
  animations: [slideInDownAnimation]
})
export class TestDetailComponent implements OnInit, OnDestroy, OnChanges, CanComponentDeactivate {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.position') position = 'absolute';

  public test: Test = new Test(''); // test with empty id
  public licenses: { key: License, value: string }[] = [];
  public difficulties: { key: Difficulty, value: string }[] = [];
  public testForm: FormGroup;
  public isNewTest = true; // new test by default
  public errorMessage: string;
  private subscription: Subscription;

  private formErrors = {
    'title': '',
    'author': '',
    'difficulty': '',
    'license': ''
  };

  private validationMessages = {
    'title': {
      'required': 'First name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 40 characters long.'
    },
    'author': {
      'required': 'Last name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 24 characters long.'
    },
    'difficulty': {
      'required': 'Difficulty is required.'
    },
    'license': {
      'required': 'License is required.'
    }
  };

  constructor(
    private store: Store<RootState>,
    private testActions: TestActions,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {

    // tslint:disable-next-line:prefer-const
    for (let license in License) {
      if (typeof License[license] === 'number') {
        this.licenses.push({ key: +License[license], value: license });
      }
    }
    // tslint:disable-next-line:prefer-const
    for (let diff in Difficulty) {
      if (typeof Difficulty[diff] === 'number') {
        this.difficulties.push({ key: +Difficulty[diff], value: diff });
      }
    }
  }

  public ngOnInit() {
    this.buildForm();

    this.route.data
      .subscribe((data: { test: Test }) => {
        const test = data.test;
        if (test) {
          this.test = test;
          this.isNewTest = false;
          this.resetForm();
        }
      });
  }

  public ngOnDestroy() {
    this.unsubscribe();
  }

  public ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    const chng = changes['test'];
    if (chng.currentValue !== chng.previousValue) {
      this.resetForm();
    }
  }

  canDeactivate(): Promise<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no test or the test data is not changed
    if (shallowEquals(this.test, this.testForm.getRawValue() as Test)) {
      return true;
    }
    // Otherwise ask the test with the dialog service and return its
    // promise which resolves to true or false when the test decides
    return this.dialogService.confirm('Discard changes?');
  }

  public buildForm(): void {
    this.testForm = this.fb.group({
      'id': [{ value: this.test.id, disabled: true }],
      'title': [this.test.title, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40)
      ]],
      'description': [this.test.description],
      'author': [this.test.author, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(24)
      ]],
      'difficulty': [this.test.difficulty, [
        Validators.required
      ]],
      'license': [this.test.license, [
        Validators.required
      ]],
      'questions': this.fb.array([], () => null)
    });

    this.testForm.statusChanges
      .subscribe(data => this.onStatusChanged(data));

    this.onStatusChanged(); // reset validation messages
  }

  public setQuestions(questions: IQuestion[]) {
    const questionFGs = questions.map(question => this.fb.group({
      'id': [{ value: question.id, disabled: true }],
      'text': [question.text, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(60)
      ]],
      'hint': [question.hint, [
        Validators.maxLength(60)
      ]],
      'weight': [question.weight, [
        Validators.required,
        Validators.min(-10),
        Validators.max(10)
      ]],
      answers: this.fb.array(question.answers.map(answer =>
        this.fb.group({
          text: [answer.text, [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(60)
          ]],
          'weight': [answer.weight, [
            Validators.required,
            Validators.min(-10),
            Validators.max(10)
          ]],
        })
      ))
    }));
    const questionFormArray = this.fb.array(questionFGs);
    this.testForm.setControl('questions', questionFormArray);
  }

  get questions(): FormArray {
    return this.testForm.get('questions') as FormArray;
  }

 questionAnswers(questionIndex): FormArray {
    return this.questions.at(questionIndex).get('answers') as FormArray;
  }

  public onSubmit() {
    this.test = this.testForm.getRawValue() as Test;
    if (this.isNewTest) {
      this.store.dispatch(this.testActions.addTest(this.test));
    } else {
      this.store.dispatch(this.testActions.editTest(this.test));
    }
    // this.goBack();
  }

  public goBack() {
    this.store.dispatch(go(['tests']))
  }

  public resetForm() {
    this.testForm.reset(this.test);
    this.setQuestions(this.test.questions);
  }

  private unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private onStatusChanged(data?: any) {
    if (!this.testForm) { return; }
    const form = this.testForm;

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

