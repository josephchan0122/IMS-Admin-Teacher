import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentsComponent } from './appointments.component';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { AppointmentEditComponent } from './appointment-edit/appointment-edit.component';
import { AppointmentCreateComponent } from "./appointment-create/appointment-create.component";
import { PresetComponent } from './preset/preset.component';
import { AppointmentPresetEditComponent } from './appointment-preset-edit/appointment-preset-edit.component';
import { AppointmentPresetCreateComponent } from './appointment-preset-create/appointment-preset-create.component';
const routes: Routes = [
  { path: 'preset', component:PresetComponent },
  { path: 'new/preset',component:AppointmentPresetCreateComponent },
  { path: 'new', component:AppointmentCreateComponent },
  
  { path:'preset/:appointment_id/:classroom/', component:AppointmentPresetEditComponent},
  { path: ':id', component: AppointmentDetailComponent},
  { path:':id/:appointment_id', component:AppointmentEditComponent},
  
  { path: '', component: AppointmentsComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
