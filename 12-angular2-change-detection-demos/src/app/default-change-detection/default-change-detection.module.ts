import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentOne } from './component-one/component-one.component';
import { ComponentTwo } from './component-two/component-two.component';
import { ComponentThree } from './component-three/component-three.component';
import { ComponentFour } from './component-four/component-four.component';
import { ComponentFive } from './component-five/component-five.component';
import { ComponentSix } from './component-six/component-six.component';
import { ComponentSeven } from './component-seven/component-seven.component';
import { DefaultChangeDetectionComponent } from './default-change-detection.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DefaultChangeDetectionComponent,
    ComponentOne,
    ComponentTwo,
    ComponentThree,
    ComponentFour,
    ComponentFive,
    ComponentSix,
    ComponentSeven
]
})
export class DefaultChangeDetectionModule { }
