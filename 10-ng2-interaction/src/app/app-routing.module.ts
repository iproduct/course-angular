import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { WikiComponent } from './wiki/wiki.component';
import { HomeComponent } from './home/home.component';
import { HeroMasterComponent } from './interaction/hero-master.component';
import { VersionParentComponent } from './interaction/version-parent.component';
import { VoteTakerComponent } from './interaction/vote-taker.componet';
import { CountdownVarParentComponent } from './interaction/countdown-var.component';
import { CountdownViewChildParentComponent } from './interaction/countdown-viewchild.component';
import { MissionControlComponent } from './interaction/mission-control.component';
import { HeroAsyncMessageComponent } from './pipes/hero-async-message.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'wiki', component: WikiComponent },
      { path: 'master', component: HeroMasterComponent },
      { path: 'versions', component: VersionParentComponent },
      { path: 'voting', component: VoteTakerComponent },
      { path: 'countdown-var', component: CountdownVarParentComponent },
      { path: 'countdown-viewchild', component: CountdownViewChildParentComponent },
      { path: 'mission', component: MissionControlComponent },
      { path: 'async', component: HeroAsyncMessageComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
