import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleGuard } from '../../@core/guards/role.guard';
import { USERROLE } from '../../@core/models/user';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[RoleGuard],data: {role: USERROLE.Admin} 
  },
  { path: 'appointment', loadChildren: () => import('./appointments/appointments.module').then(m => m.AppointmentsModule), canActivate:[RoleGuard],data: {role: USERROLE.Admin}},
  { path: 'messagecenter', loadChildren: () => import('./message-center/message-center.module').then(m => m.MessageCenterModule), canActivate:[RoleGuard],data: {role: USERROLE.Admin} },
  { path: 'admin/pictures', loadChildren: () => import('./pictures/pictures.module').then(m => m.PicturesModule) },
  { path: 'schooldocuments', loadChildren: () => import('./school-documents/school-documents.module').then(m => m.SchoolDocumentsModule), canActivate:[RoleGuard],data: {role: USERROLE.Admin} },
  { path: 'parents/:purpose', loadChildren: () => import('./parent-list/parent-list.module').then(m => m.ParentListModule), canActivate:[RoleGuard],data: {role: USERROLE.Admin} },
  { path: 'parents/pictures/:id', loadChildren: () => import('./parent-pictures/parent-pictures.module').then(m => m.ParentPicturesModule), canActivate:[RoleGuard],data: {role: USERROLE.Admin} },
  { path: 'menuofyear', loadChildren: () => import('./menu-of-year/menu-of-year.module').then(m => m.MenuOfYearModule), canActivate:[RoleGuard],data: {role: USERROLE.Admin} },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), canActivate:[RoleGuard],data: {role: USERROLE.Admin} },
  { path: 'users/:id', loadChildren: () => import('./user-detail/user-detail.module').then(m => m.UserDetailModule), canActivate:[RoleGuard],data: {role: USERROLE.Admin} },
  { path: 'notification', loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule), canActivate:[RoleGuard],data: {role: USERROLE.Admin} },
  { path: 'miniclub', loadChildren: () => import('./miniclub/miniclub.module').then(m => m.MiniclubModule) },
  { path: 'exchangelibrary', loadChildren: () => import('./exchange-library/exchange-library.module').then(m => m.ExchangeLibraryModule) },
  { path: 'marketing', loadChildren: () => import('./marketing/marketing.module').then(m => m.MarketingModule) }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
