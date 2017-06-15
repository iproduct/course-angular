import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TestListComponent } from './components/test-list.component';
import { TestDetailComponent } from './components/test-detail.component';
import { TestResolver } from './test-resolver';
import { CanDeactivateGuard } from '../common/can-deactivate-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TestListComponent,
        children: [
          {
            path: 'new',
            pathMatch: 'full',
            component: TestDetailComponent,
            data: {
              title: 'Add New Test'
            }
          },
          {
            path: ':id',
            component: TestDetailComponent,
            // canDeactivate: [CanDeactivateGuard],
            data: {
              title: 'Edit Test'
            },
            resolve: {
              test: TestResolver
            }
          }]
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    TestResolver
  ]
})
export class TestRoutingModule { }
