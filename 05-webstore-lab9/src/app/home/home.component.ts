import { Component, HostBinding } from '@angular/core';
import { slideInDownAnimation } from '../shared/animations';


@Component({
  selector: 'ws-home',
  templateUrl: './home.component.html',
  animations: [ slideInDownAnimation ],
  styleUrls: [ './home.component.css']
})
export class HomeComponent {
  @HostBinding('@routeAnimation') routeAnimation = true;
}
