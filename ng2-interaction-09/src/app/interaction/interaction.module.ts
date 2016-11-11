import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HeroChildComponent } from './hero-child.component';
import { HeroMasterComponent } from './hero-master.component';
import { VersionParentComponent } from './version-parent.component';
import { VersionChildComponent } from './version-child.component';
import { VoteTakerComponent } from './vote-taker.componet';
import { VoterComponent } from './voter.component';
import { PipesModule } from '../pipes/pipes.module';
import { CountdownTimerComponent } from './countdown-timer.component';
import { CountdownVarParentComponent } from './countdown-var.component';
import { CountdownViewChildParentComponent } from './countdown-viewchild.component';
import { MissionControlComponent } from './mission-control.component';
import { AstronautComponent } from './astronaut.component';
import { TimerNameComponent } from './timer-name.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    PipesModule
  ],
  declarations: [HeroMasterComponent, HeroChildComponent, VersionParentComponent, 
    VersionChildComponent, VoteTakerComponent, VoterComponent, CountdownTimerComponent, CountdownVarParentComponent,
    CountdownViewChildParentComponent, MissionControlComponent, AstronautComponent, TimerNameComponent ],
  exports: [HeroMasterComponent, VersionParentComponent, VoteTakerComponent, CountdownVarParentComponent,
    CountdownViewChildParentComponent, MissionControlComponent ]
})
export class InteractionModule { }
