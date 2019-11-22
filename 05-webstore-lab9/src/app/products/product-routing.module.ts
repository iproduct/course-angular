/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { CanDeactivateGuard } from '../core/can-deactivate-guard.service';
import { Role } from '../users/user.model';
import { ProductResolver } from './product-resolver';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'products',
        component: ProductListComponent,
        // canActivate: [AuthGuardService],
        // canActivateChild: [AuthGuardService],
        // data: {
        //   rolesAllowed: [Role.ADMIN],
        // },
        children: [
          {
            path: 'create',
            pathMatch: 'full',
            component: ProductDetailComponent,
            canDeactivate: [CanDeactivateGuard],
            data: {
              title: 'Add New Product',
              mode: 'edit'
            }
          },
          {
            path: 'present/:productId',
            component: ProductDetailComponent,
            data: {
              title: 'Product Data',
              mode: 'present'
            },
            resolve: {
              product: ProductResolver
            }
          },
          {
            path: 'edit/:productId',
            component: ProductDetailComponent,
            canDeactivate: [CanDeactivateGuard],
            data: {
              title: 'Edit Product',
              mode: 'edit'
            },
            resolve: {
              product: ProductResolver
            }
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ProductsRoutingModule { }
