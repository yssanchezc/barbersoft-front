import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentClientComponent } from './appointment-client.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
  { path: '', component: AppointmentClientComponent}
  ])],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
