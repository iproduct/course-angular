import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kt-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() open = false;

  constructor() { }

  ngOnInit() {
  }

}
