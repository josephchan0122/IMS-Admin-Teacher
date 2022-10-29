import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationComponent } from './notification.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';

const routes: Routes = [
  { path: 'send', component:SendNotificationComponent},
  { path: '', component: NotificationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
