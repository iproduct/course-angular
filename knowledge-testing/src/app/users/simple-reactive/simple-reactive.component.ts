import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'kt-simple-reactive',
  templateUrl: './simple-reactive.component.html',
  styleUrls: ['./simple-reactive.component.css']
})
export class SimpleReactiveComponent implements OnInit {
  @Input() user: User = new User('');
  @Input() isNew = true;

  userForm: FormGroup;
  constructor(private fb: FormBuilder, private service: UserService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      'email': [this.user.email]
    });
  }

  onSubmit(): void {
    this.user = this.userForm.getRawValue() as User;
    if (this.isNew)  {
      this.service.addUser(this.user);
    } else {
      this.service.editUser(this.user);
    }

  }

}
