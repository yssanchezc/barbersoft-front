import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
  { path: '', component: AppointmentComponent}
  ])],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
