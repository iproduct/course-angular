import {RouterModule} from '@angular/router';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductDetailReactiveComponent } from './products/product-detail-reactive/product-detail-reactive.component';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './products/product-list/product-list.component';
import { WikiComponent } from './wiki/wiki.component';

const routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: 'products', component: ProductListComponent, pathMatch: 'full' },
    { path: 'products/new', component: ProductDetailReactiveComponent},
    { path: 'products/:productId', component: ProductDetailReactiveComponent },
    { path: 'wiki', component: WikiComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
