import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { Location } from '@angular/common';
import { User, UserBase } from './user.model';
import { UserService } from './user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  // moduleId: module.id,
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit, OnChanges {
  // tslint:disable-next-line:no-input-rename
  @Input('user')
  public userMaster: User = {id: undefined} as User;
  public user: User;
  public title: string;

  public isNewUser = false;

 constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private service: UserService) { }

   public ngOnInit() {
    this.resetForm();
    this.route.params.forEach((params: Params) => {
      const id = params['id'];
      this.isNewUser = true; // new
      if (id) {
        this.isNewUser = false; // has Id => not new
        this.service.getUser(id).then(
          user => {
            this.userMaster = user;
            this.resetForm();
          });
      }
    });
    this.route.data.do(data => console.log(JSON.stringify(data)))
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

  public resetForm() {
    this.user = Object.assign(new UserBase(), this.userMaster);
  }

   public onSubmit() {
    if (this.isNewUser) {
       this.service.addUser(this.user).then(user => {
         this.userMaster = user;
         this.gotoUsers();
       });
    } else {
       this.service.editUser(this.user).then(user => {
         this.userMaster = user;
         this.goBack();
       });
    }
  }

  public gotoUsers() {
    this.router.navigate(['/users', {selectedId: this.userMaster.id}]);
  }

  public goBack() {
    this.location.back();
  }
}
