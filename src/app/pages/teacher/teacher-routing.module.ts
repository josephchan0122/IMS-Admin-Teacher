import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherComponent } from './teacher.component';

const routes: Routes = [
  { path: 'messagecenter', loadChildren: () => import('./message-center/message-center.module').then(m => m.MessageCenterModule) },  
  { path: 'pictures', loadChildren: () => import('./pictures/pictures.module').then(m => m.PicturesModule) },
  { path: 'schooldocuments', loadChildren: () => import('./school-documents/school-documents.module').then(m => m.SchoolDocumentsModule) },
  { path: 'childdailyinformation', loadChildren: () => import('./child-daily-information/child-daily-information.module').then(m => m.ChildDailyInformationModule) },
  { path: 'appointment', loadChildren: () => import('./appointment-center/appointment-center.module').then(m => m.AppointmentCenterModule) },
  { path: 'preset', loadChildren: () => import('./preset/preset.module').then(m => m.PresetModule) },
  { path: '', redirectTo:'/children'},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
