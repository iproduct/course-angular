import { Component, OnInit, Input } from '@angular/core';
import { Authenticate } from '../auth.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';
import { AuthService } from '../auth.service';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'ws-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  pending = false;
  error: string | undefined = undefined;
  // redirectUrl: string;

  constructor(
    private authService: AuthService,
    private authGuardService: AuthGuardService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // subscribe for redirect URL as query param
    // this.route.queryParams.subscribe(queryParams => {
    //   if (queryParams['url']) {
    //     this.redirectUrl = queryParams['url'];
    //   }
    // });
    this.route.data.subscribe( data => {
      if (data['logout']) {
        this.authService.logout();
      }
    });
  }

  onSubmit(credentials: Authenticate) {
    this.pending = true;
    this.authService.login(credentials).subscribe(
      result => {
        this.messageService.success(`Welcome ${result.user.username}! You have successfully logged in.`);
        this.pending = false;
        if (this.authService.redirectUrl) {
          this.router.navigate([this.authService.redirectUrl]);
          this.authService.redirectUrl = undefined;
        } else {
          this.router.navigate(['/home']);
        }
      },
      err => {
        this.error = err;
        this.messageService.error(err);
        this.pending = false;
      }
    );
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
