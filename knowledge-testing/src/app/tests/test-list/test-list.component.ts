import { Component, OnInit, HostBinding } from '@angular/core';
import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'kt-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css'],
  animations: [slideInDownAnimation]
})
export class TestListComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor() { }

  ngOnInit() {
  }

}
