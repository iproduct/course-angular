import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'td-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {

  name = 'Trayan';

  constructor() { }

  ngOnInit() {
  }

}
