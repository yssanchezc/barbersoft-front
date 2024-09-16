import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { productComponent } from './product.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: productComponent }
  ])],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

