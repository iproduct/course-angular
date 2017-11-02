import {Router, ActivatedRoute,  RouterModule} from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-route-not-found',
  templateUrl: './route-not-found.component.html',
  styleUrls: ['./route-not-found.component.css']
})
export class RouteNotFoundComponent implements OnInit {

  constructor(public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    // this.route.url.subscribe(urlSegments => urlSegments.concat('/'));
    // const temp = this.router.routerState.snapshot.url;
  }

}
