import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntranceComponent } from './entrance.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
  { path: '', component: EntranceComponent}
  ])],
  exports: [RouterModule]
})
export class EntranceRoutingModule { }
