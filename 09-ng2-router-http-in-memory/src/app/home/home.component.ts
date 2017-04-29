import { Component, HostBinding } from '@angular/core';
import { slideInDownAnimation } from '../common/animations';

@Component({
  selector: 'simple-form',
  templateUrl: './home.component.html',
  animations: [ slideInDownAnimation ]
})
export class HomeComponent { 
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.width')   width = '100%';
  @HostBinding('style.position')  position = 'absolute';

  public imageBox = require('../../assets/img/ipt-box.png');
}
