import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentCenterComponent } from './appointment-center.component';
import { RequestMeetingComponent } from './request-meeting/request-meeting.component';

const routes: Routes = [
  { path: '', component: AppointmentCenterComponent },
  { path: 'request', component: RequestMeetingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentCenterRoutingModule { }
