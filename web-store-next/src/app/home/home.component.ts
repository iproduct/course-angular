import { Component, HostBinding } from '@angular/core';
import { slideInDownAnimation } from '../shared/animations';


@Component({
  selector: 'simple-form',
  templateUrl: './home.component.html',
  animations: [ slideInDownAnimation ],
  styleUrls: [ './home.component.css']
})
export class HomeComponent {
  @HostBinding('@routeAnimation') routeAnimation = true;

  imageBox = '../../assets/img/ipt-box.png';
}
