import { Component, Input } from '@angular/core';

import { User } from './user.model';

@Component({
  // moduleId: module.id,
  selector: 'user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent {
  @Input()
  public user: User;
}
